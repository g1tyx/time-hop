import {ProgressBar} from "@/game/progressbars/ProgressBar";
import {App} from "@/App";
import {MultiRequirement} from "@/engine/requirements/MultiRequirement";
import {Currency} from "@/engine/features/wallet/Currency";

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
        if (!App.game.wallet.hasCurrency(this.cost)) {
            return;
        }

        App.game.wallet.loseCurrency(this.cost);
        if (this.isStarted) {
            console.warn("Cannot start twice");
            return;
        }
        this.isStarted = true;
        this.value = 0;
    }

    canRepeat(): boolean {
        return true;
    }

    gasolineReward(): number {
        return 1;
        // const upgrade = (App.game.gasoline.upgrades.getUpgrade(this.valueUpgrade) as DiscreteUpgrade);
        // return upgrade.getBonus();
    }

    gainReward(): void {
        App.game.wallet.gainGasoline(this.gasolineReward());

    }

}
