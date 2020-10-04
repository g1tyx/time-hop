import {Feature} from "@/game/Feature";
import {App} from "@/App.ts";
import {TimeLineState} from "@/game/features/timeline/TimeLineState";
import {UpgradeList} from "@/engine/upgrades/UpgradeList";
import {Upgrade} from "@/engine/upgrades/Upgrade";
import {UpgradeSaveData} from "@/engine/upgrades/UpgradeSaveData";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {Currency} from "@/engine/features/wallet/Currency";
import {PlutoniumSaveData} from "@/game/features/plutonium/PlutoniumSaveData";

export class Plutonium extends Feature {
    name: string = "Plutonium";
    saveKey: string = "plutonium";

    upgrades: UpgradeList<Upgrade, UpgradeSaveData>;

    nextPlutoniumGain: number;

    constructor() {
        super();
        this.upgrades = new UpgradeList<Upgrade, UpgradeSaveData>(
            []
        );


        this.nextPlutoniumGain = Date.now();
    }

    update(delta: number) {
        if (!this.canAccess()) {
            return;
        }
        if (Date.now() > this.nextPlutoniumGain) {
            App.game.wallet.gainPlutonium(1);
            this.nextPlutoniumGain = Date.now() + 1000;
        }
    }

    load(data: PlutoniumSaveData): void {
        // Empty
    }


    canAccess(): boolean {
        return App.game.timeLine.state >= TimeLineState.Plutonium && App.game.wallet.hasCurrency(new Currency(CurrencyType.Plutonium, 1));
    }

    parseSaveData(json: Record<string, unknown>): PlutoniumSaveData {
        return new PlutoniumSaveData();
    }

    save(): PlutoniumSaveData {
        return new PlutoniumSaveData();
    }

}

