import {Feature} from "@/game/Feature";
import {App} from "@/App.ts";
import {UpgradeList} from "@/engine/upgrades/UpgradeList";
import {Upgrade} from "@/engine/upgrades/Upgrade";
import {UpgradeSaveData} from "@/engine/upgrades/UpgradeSaveData";
import {GasolineSaveData} from "@/game/features/gasoline/GasolineSaveData";
import {GasolineAction} from "@/game/features/gasoline/GasolineAction";
import {Currency} from "@/engine/features/wallet/Currency";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";

export class Gasoline extends Feature {
    name: string = "Gasoline";
    saveKey: string = "gasoline";

    upgrades: UpgradeList<Upgrade, UpgradeSaveData>;

    nextGasolineGain: number;
    actions: GasolineAction[]

    constructor() {
        super();
        this.upgrades = new UpgradeList<Upgrade, UpgradeSaveData>(
            []
        );

        this.actions = [
            new GasolineAction("Oil Drill", new Currency(1, CurrencyType.Gasoline), "gasoline-first-machine"),
        ]

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
        return App.game.timeLine.canAccessGasoline;
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

