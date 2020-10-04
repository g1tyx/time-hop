import {ProgressBar} from "@/game/progressbars/ProgressBar";
import {App} from "@/App";
import {MultiRequirement} from "@/engine/requirements/MultiRequirement";
import {SingleLevelUpgrade} from "@/engine/upgrades/SingleLevelUpgrade";
import {DiscreteUpgrade} from "@/engine/upgrades/DiscreteUpgrade";

export class ScrapAction extends ProgressBar {
    description: string;
    baseGain: number;
    automationUpgrade: string;
    valueUpgrade: string;

    constructor(description: string, goal: number, baseGain: number, automationUpgrade: string, valueUpgrade: string, requirements: MultiRequirement = new MultiRequirement([])) {
        super(goal, requirements);
        this.description = description;
        this.baseGain = baseGain;
        this.automationUpgrade = automationUpgrade;
        this.valueUpgrade = valueUpgrade
    }

    canRepeat(): boolean {
        return (App.game.scrap.upgrades.getUpgrade(this.automationUpgrade) as SingleLevelUpgrade).isBought();
    }

    scrapReward(): number {
        const upgrade = (App.game.scrap.upgrades.getUpgrade(this.valueUpgrade) as DiscreteUpgrade);
        return this.baseGain * upgrade.getBonus();
    }

    gainReward(): void {
        App.game.wallet.gainScrap(this.scrapReward());

    }

}
