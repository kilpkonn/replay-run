import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";

export class MapUtils {

    static getPointSymbol(colorArray: Array<number>) {
        return {
            type: "simple-marker",
            color: colorArray,
            size: 8,
            outline: {
                color: colorArray,
                width: 2
            }
        };
    }

    static getLineSymbol(colorArray: Array<number>) {
        return {
            type: "simple-line",
            color: colorArray,
            width: 3,
        };
    }

    static getPointGraphicDefinition(pointArray: Array<number>, colorArray: Array<number>) {
        let point = new Point({
            'longitude': pointArray[0],
            'latitude': pointArray[1],
            'spatialReference': new SpatialReference({ 'wkid': 4326 })
        });
        const graphicDefinition = {
            geometry: point,
            symbol: this.getPointSymbol(colorArray),
            attributes: {},
            popupTemplate: {
                title: "Segment",
                content: [{
                    type: "fields",
                    fieldInfos: []
                }]
            }
        };
        return graphicDefinition;
    }

    static getLineGraphicDefinition(pointArray: Array<Array<number>>, time: number, colorArray: Array<number>) {
        let polyline = {
          type: "polyline",
            paths: [
              pointArray.slice(Math.max(time - 90, 0), time)
            ]
        };
        const graphicDefinition = {
            geometry: polyline,
            symbol: this.getLineSymbol(colorArray),
            attributes: {},
        };
        return graphicDefinition;
    }


    static getPointGraphic(pointArray: Array<number>, colorArray: Array<number>) {
        const pointGraphicDefinition = this.getPointGraphicDefinition(pointArray, colorArray);
        return new Graphic(pointGraphicDefinition);
    }

    static getLineGraphic(pointArray: Array<Array<number>>, time: number, colorArray: Array<number>) {
        const lineGraphicDefinition = this.getLineGraphicDefinition(pointArray, time, colorArray);
        return new Graphic(lineGraphicDefinition);
    }
}
