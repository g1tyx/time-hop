import {Feature} from "@/game/Feature";
import {App} from "@/App.ts";
import {TimeLineState} from "@/game/features/timeline/TimeLineState";
import {UpgradeList} from "@/engine/upgrades/UpgradeList";
import {Upgrade} from "@/engine/upgrades/Upgrade";
import {UpgradeSaveData} from "@/engine/upgrades/UpgradeSaveData";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {Currency} from "@/engine/features/wallet/Currency";
import {LightningSaveData} from "@/game/features/lightning/LightningSaveData";

export class Lightning extends Feature {
    name: string = "Lightning";
    saveKey: string = "lightning";

    upgrades: UpgradeList<Upgrade, UpgradeSaveData>;

    nextLightningGain: number;

    constructor() {
        super();
        this.upgrades = new UpgradeList<Upgrade, UpgradeSaveData>(
            []
        );


        this.nextLightningGain = Date.now();
    }

    update(delta: number) {
        if (!this.canAccess()) {
            return;
        }
        if (Date.now() > this.nextLightningGain) {
            App.game.wallet.gainLightning(1);
            this.nextLightningGain = Date.now() + 1000;
        }
    }

    load(data: LightningSaveData): void {
        // Empty
    }


    canAccess(): boolean {
        return App.game.timeLine.state >= TimeLineState.Lightning && App.game.wallet.hasCurrency(new Currency(1, CurrencyType.Lightning));
    }

    parseSaveData(json: Record<string, unknown>): LightningSaveData {
        return new LightningSaveData();
    }

    save(): LightningSaveData {
        return new LightningSaveData();
    }

    reset() {
        // Empty
    }
}

