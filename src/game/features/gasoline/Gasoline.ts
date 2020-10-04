import {Feature} from "@/game/Feature";
import {App} from "@/App.ts";
import {TimeLineState} from "@/game/features/timeline/TimeLineState";
import {UpgradeList} from "@/engine/upgrades/UpgradeList";
import {Upgrade} from "@/engine/upgrades/Upgrade";
import {UpgradeSaveData} from "@/engine/upgrades/UpgradeSaveData";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {Currency} from "@/engine/features/wallet/Currency";
import {GasolineSaveData} from "@/game/features/gasoline/GasolineSaveData";

export class Gasoline extends Feature {
    name: string = "Gasoline";
    saveKey: string = "gasoline";

    upgrades: UpgradeList<Upgrade, UpgradeSaveData>;

    nextGasolineGain: number;

    constructor() {
        super();
        this.upgrades = new UpgradeList<Upgrade, UpgradeSaveData>(
            []
        );


        this.nextGasolineGain = Date.now();
    }

    update(delta: number) {
        if (!this.canAccess()) {
            return;
        }
        if (Date.now() > this.nextGasolineGain) {
            App.game.wallet.gainGasoline(1);
            this.nextGasolineGain = Date.now() + 1000;
        }
    }

    load(data: GasolineSaveData): void {
        // Empty
    }


    canAccess(): boolean {
        return App.game.timeLine.state >= TimeLineState.Gasoline && App.game.wallet.hasCurrency(new Currency(1, CurrencyType.Gasoline));
    }

    parseSaveData(json: Record<string, unknown>): GasolineSaveData {
        return new GasolineSaveData();
    }

    save(): GasolineSaveData {
        return new GasolineSaveData();
    }

    reset() {
        // Empty
    }
}

