import {ProgressBar} from "@/game/progressbars/ProgressBar";
import {App} from "@/App";
import {MultiRequirement} from "@/engine/requirements/MultiRequirement";

export class ScrapAction extends ProgressBar {
    description: string;
    baseGain: number;

    constructor(description: string, goal: number, baseGain: number, requirements: MultiRequirement = new MultiRequirement([])) {
        super(goal, requirements);
        this.description = description;
        this.baseGain = baseGain;
    }

    canRepeat(): boolean {
        return App.game.scrap.hasScrapAutomation();
    }


    gainReward(): void {
        App.game.wallet.gainScrap(this.baseGain);

    }

}
