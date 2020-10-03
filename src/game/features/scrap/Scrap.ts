import {Feature} from "@/game/Feature";
import {ScrapSaveData} from "@/game/features/scrap/ScrapSaveData";
import {App} from "@/App.ts";
import {TimeLineState} from "@/game/features/timeline/TimeLineState";

export class Scrap extends Feature {
    name: string = "Scrap";
    saveKey: string = "scrap";

    update(delta: number) {
        App.game.wallet.gainScrap(1);
    }

    load(data: ScrapSaveData): void {
        // Empty
    }


    canAccess(): boolean {
        return App.game.timeLine.state >= TimeLineState.Scrap;
    }

    parseSaveData(json: Record<string, unknown>): ScrapSaveData {
        return new ScrapSaveData();
    }

    save(): ScrapSaveData {
        return new ScrapSaveData();
    }

}
