// @ts-nocheck

import { Activity } from "./models";

export class Player {

    activities: Activity[] = [];
    multiplier: number = 10;
    seconds: number = 0;
    startDateTime?: Date;
    currentDateTime?: Date;
    maxSecondsOfAnyActivity: number = 0;
    timerEventName: string = 'player-tick';
    timerEvent: Event = new Event(this.timerEventName);
    timer: any = null;
    paused: boolean = true;
    done: boolean = false;

    get started(): boolean {
        return !this.paused || this.seconds !== 0;
    }

    clearActivities() {
        this.activities.length = 0;
        this.reset();
    }

  addActivity(activity: Activity) {
    const existingIds = this.activities?.map(x => x.id || 0);
    const maxId = existingIds.length ? Math.max(...existingIds) : 0;
    activity.id = maxId + 1;
    this.activities.push(activity);
    this.reset();
  }

  appendActivity(activityIdToAppendTo: number, activityToAppend: Activity) {
    const activityToAppendTo = this.activities.filter(x => x.id === activityIdToAppendTo)[0];
    activityToAppendTo.points = activityToAppendTo.points.concat(activityToAppend.points);
    this.reset();
  }

  deleteActivity(id: number) {
    this.activities = this.activities.filter(x => x.id !== id);
    this.reset;
  }

    reset() {
        this.seconds = 0;
        this.startDateTime = new Date(Math.min(...this.activities.map(it => it.startDateTime)));
        this.currentDateTime = this.startDateTime;
        this.toggleStartPause(true);
        this.refreshCalculations();
    }

    resetActivityCounters() {
        for (const activity of this.activities) {
            activity.accumulatedDistance = 0;
            activity.lastTimeUsedForDistance = 0;
            activity.averageSpeed = '';
            activity.offset = Math.round((activity.startDateTime.getTime() - this.startDateTime!.getTime()) / 1000)
        }
        const lengths = this.activities.filter(x => x.visible).map(x => x.points.length);
        this.maxSecondsOfAnyActivity = Math.max.apply(Math, lengths) - 1;
    }

    refreshCalculations() {
        this.resetActivityCounters();
        this.calculateDistances();
        this.setCurrentDateTime();
    }

    restartTimer() {
        if (!this.paused) {
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.timer = setInterval(() => {
                this.done = this.seconds >= this.maxSecondsOfAnyActivity;
                if (!this.done) {
                    this.seconds++;
                } else {
                    this.paused = true;
                }
                if (this.seconds % 10 === 0 || this.done) {
                    this.calculateDistances();
                }
                this.setCurrentDateTime();
                document.dispatchEvent(this.timerEvent);
                if (this.done) {
                    clearInterval(this.timer);
                }
            }, 1000 / this.multiplier);
        }
    }

    toggleStartPause(setToPause?: boolean) {
        if (setToPause === undefined) {
            this.paused = !this.paused;
        } else {
            this.paused = setToPause;
        }

        if (this.timer) {
            clearInterval(this.timer);
        }
        this.refreshCalculations();
        this.restartTimer();
    }

    adjustSpeed(add: boolean) {
        let multiplier = this.multiplier;
        if (add) {
            if (multiplier >= 50) {
                multiplier = multiplier + 10;
            }
            else if (multiplier >= 10) {
                multiplier = multiplier + 5;
            } else {
                multiplier++;
            }
        } else
            if (multiplier > 50) {
                multiplier = multiplier - 5;
            }
            else if (multiplier > 10) {
                multiplier = multiplier - 5;
            } else if (multiplier > 1) {
                multiplier--;
            } else {
                multiplier = 1;
            }
        this.multiplier = multiplier;
        this.restartTimer();
    }

    goBackward() {
        this.seconds = this.seconds - this.multiplier;
        if (this.seconds < 0) {
            this.seconds = 0;
        }
        this.refreshCalculations();
    }

    setCurrentSeconds(percentage: number) {
      this.toggleStartPause(true);
      const maxSeconds = Math.max(...this.activities.map(it => Math.max(it.points.length - it.offset, 0)))
      this.seconds = Math.floor(percentage * maxSeconds / 1000000.0)
      this.refreshCalculations();
    }

    getPercentage() {
      const maxSeconds = Math.max(...this.activities.map(it => Math.max(it.points.length - it.offset, 0)))
      return this.seconds / maxSeconds;
    }

    goForward() {
        this.seconds = this.seconds + this.multiplier;
        if (this.seconds < 0) {
            this.seconds = 0;
        }
        this.refreshCalculations();
    }

    getCenter() {
        let ySum: number = 0;
        let xSum: number = 0;
        let count: number = 0;
        for (let i = 0; i < this.activities.length; i++) {
            const activity = this.activities[i];
            if (activity.visible && activity.points.length > this.seconds) {
                const time = Math.max(this.seconds - this.activities[i].offset, 0);
                xSum += this.activities[i].points[time][0];
                ySum += this.activities[i].points[time][1];
                count++;
            }
        }
        if (count) {
            return [xSum / count, ySum / count];
        } else {
            return null;
        }
    }

    calculateDistances() {
        for (let i = 0; i < this.activities.length; i++) {
            let activity = this.activities[i];
            let secondsForCalculations = activity.points.length - 1;
            if (this.started) {
                secondsForCalculations = this.seconds - activity.offset;
            }
            if (!activity.lastTimeUsedForDistance || !activity.accumulatedDistance) {
                activity.lastTimeUsedForDistance = 1;
                activity.accumulatedDistance = 0;
            }
            if (activity.lastTimeUsedForDistance <= secondsForCalculations) {
                for (let t = activity.lastTimeUsedForDistance; t < secondsForCalculations; t++) {
                    if (activity.points.length > t) {
                        const lastPoint = activity.points[t - 1];
                        const currentPoint = activity.points[t];
                        if (!activity.accumulatedDistance) {
                            activity.accumulatedDistance = 0;
                        }
                        const distance = this.calcCrow(lastPoint[1], lastPoint[0], currentPoint[1], currentPoint[0]);
                        activity.accumulatedDistance += distance;
                        activity.speed = distance / 1852 * 3600;
                    }
                }
                activity.lastTimeUsedForDistance = secondsForCalculations;
            }
            activity.averageSpeed = this.getAverageSpeed(secondsForCalculations, activity.accumulatedDistance);
            activity.timeDisplay = this.getMinutesSeconds(Math.max(secondsForCalculations, 0));
        }
    }

    setCurrentDateTime() {
        if (this.startDateTime) {
            var newDate = new Date(this.startDateTime);
            newDate.setSeconds(this.startDateTime?.getSeconds() + this.seconds);
            this.currentDateTime = newDate;
        }
    }

    toRad(value: number) {
        return value * Math.PI / 180;
    }

    calcCrow(lat1: number, lon1: number, lat2: number, lon2: number) {
        var R = 6371; // km
        var dLat = this.toRad(lat2 - lat1);
        var dLon = this.toRad(lon2 - lon1);
        var lat1 = this.toRad(lat1);
        var lat2 = this.toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d * 1000;
    }

    getMinutesSeconds(totalSeconds: number) {
        const hours = Math.floor(totalSeconds / 3600);
        let minutesSeconds = totalSeconds;
        if (hours > 0) {
            minutesSeconds = minutesSeconds - (hours * 3600);
        }
        const minutes = Math.floor(minutesSeconds / 60);
        const seconds = totalSeconds - minutes * 60;
        const hoursText = hours > 0 ? hours.toString() + ':' : '';
        return `${hoursText}${this.getPaddedValue(minutes)}:${this.getPaddedValue(seconds)}`;
    }

    getAverageSpeed(totalSeconds: number, distance: number) {
        const averageSpeed = (distance / totalSeconds / 1852 * 3600).toFixed(2);
        return `${averageSpeed} kn`;
    }

    getPaddedValue(value: number) {
        return ('00' + value).slice(-2);
    }

}
