import {ProgressBar} from "@/game/progressbars/ProgressBar";
import {App} from "@/App";
import {MultiRequirement} from "@/engine/requirements/MultiRequirement";
import {Currency} from "@/engine/features/wallet/Currency";
import {DiscreteUpgrade} from "@/engine/upgrades/DiscreteUpgrade";

export class GasolineAction extends ProgressBar {
    description: string;
    cost: Currency;
    valueUpgrade: string;

    constructor(description: string, cost: Currency, valueUpgrade: string, requirements: MultiRequirement = new MultiRequirement([])) {
        super(1, requirements);
        this.description = description;
        this.cost = cost;
        this.valueUpgrade = valueUpgrade
    }


    start() {
        if (this.isStarted) {
            console.warn("Cannot start twice");
            return;
        }
        this.isStarted = true;
        this.value = 0;
    }

    canRepeat(): boolean {
        return (App.game.gasoline.gasolineUpgrades.getUpgrade(this.valueUpgrade) as DiscreteUpgrade).level > 0;
    }

    oilReward(): number {
        const upgrade = (App.game.gasoline.gasolineUpgrades.getUpgrade(this.valueUpgrade) as DiscreteUpgrade);
        return upgrade.getBonus() * App.game.gasoline.getOilMultiplier();
    }

    gainReward(): void {
        App.game.wallet.gainOil(this.oilReward());

    }

}
