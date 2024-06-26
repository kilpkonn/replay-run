// @ts-nocheck

import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { Activities } from "./activities";
import { MapUtils } from "./map-utilities";
import { GPXParser } from "./gpxParser";
import { Player } from "./player";
import { Base } from "./base";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";

export class Main extends Base {
  player: Player = new Player();
  gpxParser: GPXParser = new GPXParser();
  view?: MapView;
  map?: Map;
  colors?: number[][];
  pointLayer?: GraphicsLayer;
  appendActivityId?: number;

  async run() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(<string> prop),
    });

    let start = [-76, 42];
    let zoom = 6;
    if ((<any> params)["default"] === "true") {
      this.player.activities = [Activities.Activity1, Activities.Activity2];
      start = this.player.activities[0].points[0];
      zoom = 16;
    } else if ((<any> params)["load"] === "drchhbgmile2022") {
      this.loadGpxFromUrl("Harrisburg_Mile_2022_Ty.gpx");
      this.loadGpxFromUrl("Harrisburg_Mile_2022_Cem.gpx");
      this.loadGpxFromUrl("Harrisburg_Mile_2022_Jim.gpx");
      this.loadGpxFromUrl("Harrisburg_Mile_2022_David.gpx");
      start = [-76.900068, 40.278698];
      zoom = 17;
    }

    const map = new Map({ basemap: "streets-vector" });

    this.view = new MapView({
      map: map,
      container: "viewDiv",
      center: start,
      zoom: zoom,
    });

    const basemapToggle = new BasemapToggle({
      view: this.view,
      nextBasemap: "hybrid",
    });
    this.view.ui.add(basemapToggle, "bottom-left");

    this.pointLayer = new GraphicsLayer({});
    map.add(this.pointLayer);

    this.colors = [
      [200, 0, 0],
      [0, 200, 0],
      [0, 0, 200],
      [200, 120, 0],
      [100, 0, 0],
      [0, 100, 0],
      [0, 0, 100],
      [255, 165, 0],
    ];

    document.addEventListener("player-tick", () => {
      this.refresh();
    });

    this.addClickHandler("upload", () => {
      this.getById("gpxFile").click();
    });

    this.addClickHandler("clear", () => {
      this.player.clearActivities();
      this.refreshActivities();
      this.gaEvent("clear_activities");
    });

    this.addClickHandler("reset", () => {
      this.player.toggleStartPause(true);
      this.player.reset();
      this.gaEvent("reset");
    });

    this.addClickHandler("slower", () => {
      this.player.adjustSpeed(false);
      this.gaEvent("slower");
    });

    this.addClickHandler("faster", () => {
      this.player.adjustSpeed(true);
      this.gaEvent("faster");
    });

    this.addInputHandler("player-range", (e) => {
      this.player.setCurrentSeconds(e.target.value);
    });

    this.addClickHandler("back", () => {
      this.player.goBackward();
      this.gaEvent("back");
    });

    this.addClickHandler("forward", () => {
      this.player.goForward();
      this.gaEvent("forward");
    });

    this.addClickHandler("pause", () => {
      this.player.toggleStartPause(true);
      this.gaEvent("pause");
    });

    this.addClickHandler("start", () => {
      this.player.toggleStartPause(false);
      this.gaEvent("start");
    });

    const centerButton = this.getById("center");
    this.addClickHandler("center", () => {
      if (this.isAutoCenterButtonActive()) {
        centerButton!.classList.remove("active");
      } else {
        centerButton!.classList.add("active");
      }
      this.gaEvent("auto_center");
    });

    this.getById("gpxFile")?.addEventListener("change", (e) => {
      const files = (<HTMLInputElement> e.currentTarget!).files!;
      Object.keys(files).forEach((i) => {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
          //server call for uploading or reading the files one-by-one
          //by using 'reader.result' or 'file'
          this.createActivityFromTextResult(
            <any> reader.result,
            file.name.replace(/\.gpx/ig, ""),
          );
        };
        reader.readAsBinaryString(file);
      });
      this.closeModal();
    });

    this.addClickHandler("activities", (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      if (element.tagName === "INPUT") {
        const htmlInputElement = element as HTMLInputElement;
        const inputActivityId = htmlInputElement.id.split("-")[1];
        const activitiesFound = this.player.activities.filter((x) =>
          x.id === parseInt(inputActivityId)
        );
        if (activitiesFound.length) {
          activitiesFound[0].visible = htmlInputElement.checked;
          this.gaEvent("toggle_visibility");
        }
      }
    });

    this.addClickHandler("close-modal", () => {
      this.closeModal();
    });

    this.addClickHandler("upload-gpx-from-modal", () => {
      this.getById("gpxFile").click();
    });

    this.player.restartTimer();
    this.refresh();

    this.showOrHide("panel", true);

    if (!(<any> params)["load"]) {
      this.showModal();
    }
  }

  createActivityFromTextResult(textResult: string, fileName: string) {
    const activity = this.gpxParser.getActivitiesFromResult(
      textResult,
      fileName,
    );
    const existingIds = this.player.activities?.map((x) => x.id || 0);
    const maxId = existingIds.length ? Math.max(...existingIds) : 0;
    activity.id = maxId + 1;
    this.player.activities.push(activity);
    this.player.reset();
    this.refreshActivities();
    this.refresh();
    if (this.player.activities.length === 1) {
      this.center(16);
    }
    this.gaEvent("load_activity");
  }

  loadGpxFromUrl(url: string) {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send(null);
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        const type = request.getResponseHeader("Content-Type");
        if (type?.indexOf("text") !== 1) {
          const text = request.responseText;
          this.createActivityFromTextResult(text);
        }
      }
    };
  }

  enableDisableButtons() {
    const disabled = !this.player.activities.length;
    const buttonIds = [
      "clear",
      "reset",
      "back",
      "start",
      "pause",
      "forward",
      "center",
      "faster",
      "slower",
    ];
    for (const buttonId of buttonIds) {
      this.getButtonById(buttonId).disabled = disabled;
    }
  }

  refreshActivities() {
    this.rebuildActivityTable();
    this.addActivitiesSettingsHandlers();
    this.enableDisableButtons();
  }

  startAppendToActivity(id: number) {
    this.getById("gpxFile").click();
    this.appendActivityId = id;
  }

  deleteActivity(id: number) {
    this.player.deleteActivity(id);
    this.refreshActivities();
  }

  rebuildActivityTable() {
    let html = "";
    for (let i = 0; i < this.player.activities.length; i++) {
      let activity = this.player.activities[i];
      html += `<tr id="tr-${activity.id}">
                    <td><input type="checkbox" id="toggle-${activity.id}" ${
        activity.visible ? "checked" : ""
      }/></td>
                    <td class="icon"><span style="background-color: rgb(${
        this.colors![i].join(",")
      })"></td>
                    <td>${activity.title}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <button class="settings" id="settings-button-${activity.id}"><i class="bi bi-gear"></i></button>                      
                        <div id="settings-list-${activity.id}" class="settings-list">
                            <button id="append-activity-${activity.id}">Append</button>
                            <button id="delete-activity-${activity.id}">Delete</button>
                        </div>                     
                    </td>
                </tr>`;
    }
    html = `<table class="table">
                <thead>
                  <th></th>
                  <th></th>
                  <th>Name</th>
                  <th>Miles</th>
                  <th>Speed</th>
                  <th>Time</th>
                  <th>Edit</th>
                </thhead>
                <tbody>${html}</tboday>
              </table>`;
    (<any> this.getById("activities")).innerHTML = html;
    this.enableDisableButtons();
  }

  addActivitiesSettingsHandlers() {
    for (let activity of this.player.activities) {
      this.getById(`settings-button-${activity.id}`).addEventListener(
        "click",
        () => {
          this.toggleSettings(activity.id!);
        },
      );
      this.addClickHandler(`append-activity-${activity.id}`, () => {
        this.startAppendToActivity(activity.id!);
        this.showOrHide(`settings-list-${activity.id}`, false);
      });
      this.addClickHandler(`delete-activity-${activity.id}`, () => {
        this.deleteActivity(activity.id!);
      });
    }
  }

  setActivityText() {
    for (let i = 0; i < this.player.activities.length; i++) {
      let activity = this.player.activities[i];
      if (activity) {
        const tr = this.getById("tr-" + activity.id?.toString());
        if (tr) {
          if (activity.accumulatedDistance === undefined) {
            activity.accumulatedDistance = 0;
          }
          tr.children[3].innerHTML = (activity.accumulatedDistance / 1852).toFixed(2);
          tr.children[4].innerHTML = activity.speed.toFixed(2) || "";

          tr.children[5].innerHTML = activity.timeDisplay || "";
        }
      }
    }
  }

  setSpeedText() {
    this.getById("multiplier").innerHTML = `${this.player.multiplier}`;
  }

  setStartPauseText() {
    this.showOrHide("start", this.player.paused, "inline-block");
    this.showOrHide("pause", !this.player.paused, "inline-block");
  }

  setTimeText() {
    this.getById("time").innerHTML = this.player.getMinutesSeconds(
      this.player.seconds,
    );
    if (this.player.currentDateTime) {
      this.showOrHide("current-time-label", true, "inline");
      this.getById("current-time-text").innerHTML = this.player.currentDateTime
        .toLocaleTimeString();
    } else {
      this.showOrHide("current-time-label", false, "inline");
      this.getById("current-time-text").innerHTML = "";
    }
  }

  setPlayerDrag() {
    this.getInputById("player-range").value = `${Math.floor(this.player.getPercentage() * 1000000)}`
  }

  setLatLongText() {
    if (this.player.activities.length) {
      this.showOrHide("lat-long-label", true, "inline");
      const firstActivity = this.player.activities[0];
      const point =
        firstActivity
          .points[
            Math.min(this.player.seconds, firstActivity.points.length - 1)
          ];
      this.getById("lat-long-text").innerHTML = point[0].toFixed(5).toString() +
        ", " + point[1].toFixed(5).toString();
    } else {
      this.showOrHide("lat-long-label", false);
      this.getById("lat-long-text").innerHTML = "";
    }
  }

  refreshGraphics() {
    this.pointLayer!.removeAll();
    for (let i = 0; i < this.player.activities.length; i++) {
      let activity = this.player.activities[i];
      if (
        activity.visible && activity.points?.length > this.player.seconds &&
        this.player.seconds - activity.offset >= 0
      ) {
        const pgraphic = MapUtils.getPointGraphic(
          activity.points[this.player.seconds - activity.offset],
          this.colors![i],
        );
        this.pointLayer!.add(pgraphic);
        const lgraphic = MapUtils.getLineGraphic(
          activity.points,
          this.player.seconds - activity.offset,
          this.colors![i],
        );
        this.pointLayer!.add(lgraphic);
      }
    }
  }

  resizeMap() {
    if (window.innerWidth < 500) {
      const panel = this.getById("panel");
      const mapContainer = this.getById("map-container");
      if (panel && mapContainer) {
        mapContainer.style.height =
          (window.innerHeight - panel.offsetHeight).toString() + "px";
      }
    }
  }

  gaEvent(action: string) {
    (<any> window).gtag("event", action);
  }

  refresh() {
    this.refreshGraphics();
    this.setActivityText();
    this.setStartPauseText();
    this.setTimeText();
    this.setLatLongText();
    this.setSpeedText();
    this.setPlayerDrag();
    if (this.isAutoCenterButtonActive()) {
      this.center();
    }
    this.resizeMap();
  }

  center(zoom?: number) {
    const centerFromPlayer = this.player.getCenter();
    if (zoom) {
      (<any> this.view).goTo({
        center: centerFromPlayer,
        zoom: zoom,
      });
    } else {
      (<any> this.view).center = centerFromPlayer;
    }
  }

  isAutoCenterButtonActive() {
    return this.getById("center")?.classList.contains("active");
  }

  showModal() {
    this.getById("modal")?.setAttribute("style", "display:block");
    this.getById("modal")?.classList.add("show");
    this.getById("modal-backdrop")?.setAttribute("style", "display:block");
    this.getById("modal-backdrop")?.classList.add("show");
  }

  closeModal() {
    this.getById("modal")?.setAttribute("style", "display:none");
    this.getById("modal")?.classList.remove("show");
    this.getById("modal-backdrop")?.setAttribute("style", "display:none");
    this.getById("modal-backdrop")?.classList.remove("show");
  }
  toggleSettings(activityId: number) {
    const id = `settings-list-${activityId}`;
    const settings = this.getById(id);
    const visible = settings?.style?.display === "block";
    this.showOrHide(id, !visible);
  }
}
