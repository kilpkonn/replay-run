export interface Activity {
    id?: number;
    title?: string;
    points: number[][];
    lastTimeUsedForDistance?: number;
    accumulatedDistance?: number;
    speed?: number;
    averageSpeed?: string;
    timeDisplay?: string;
    startDateTime?: Date;
    visible?: boolean;
    offset: number;
}
