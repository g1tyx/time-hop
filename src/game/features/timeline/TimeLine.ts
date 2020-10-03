import {Feature} from "@/game/Feature";
import {TimeLineState} from "@/game/features/timeline/TimeLineState";
import {TimeLineSaveData} from "@/game/features/timeline/TimeLineSaveData";


export class TimeLine extends Feature {
    name: string = "Timeline";
    saveKey: string = "timeline";

    state: TimeLineState;


    constructor() {
        super();
        this.state = TimeLineState.Scrap;
    }

    load(data: TimeLineSaveData): void {
        this.state = data.state;
    }

    parseSaveData(json: Record<string, unknown>): TimeLineSaveData {
        return new TimeLineSaveData(json.state as TimeLineState ?? TimeLineState.Scrap);
    }

    save(): TimeLineSaveData {
        return new TimeLineSaveData(this.state);
    }

}
