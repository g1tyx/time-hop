import {SaveData} from "@/engine/saving/SaveData";
import {TimeLineState} from "@/game/features/timeline/TimeLineState";

export class TimeLineSaveData extends SaveData {
    state: TimeLineState;


    constructor(state: TimeLineState) {
        super();
        this.state = state;
    }
}
