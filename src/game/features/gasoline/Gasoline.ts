import {Feature} from "@/game/Feature";
import {App} from "@/App.ts";
import {UpgradeList} from "@/engine/upgrades/UpgradeList";
import {Upgrade} from "@/engine/upgrades/Upgrade";
import {UpgradeSaveData} from "@/engine/upgrades/UpgradeSaveData";
import {GasolineSaveData} from "@/game/features/gasoline/GasolineSaveData";
import {GasolineAction} from "@/game/features/gasoline/GasolineAction";
import {Currency} from "@/engine/features/wallet/Currency";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {DiscreteUpgrade} from "@/engine/upgrades/DiscreteUpgrade";
import {UpgradeType} from "@/engine/upgrades/UpgradeType";
import {CurrencyBuilder} from "@/engine/features/wallet/CurrencyBuilder";

export class Gasoline extends Feature {
    name: string = "Gasoline";
    saveKey: string = "gasoline";

    upgrades: UpgradeList<Upgrade, UpgradeSaveData>;

    actions: GasolineAction[]

    // How often we've converted oil to gasoline already
    conversionCount: number;

    constructor() {
        super();
        this.upgrades = new UpgradeList<Upgrade, UpgradeSaveData>(
            [
                new DiscreteUpgrade("gasoline-first-machine", UpgradeType.GasolineMachine, "First machine", 3,
                    CurrencyBuilder.createArray([1, 5, 10], CurrencyType.Gasoline), [0, 1, 2, 3], true)
            ]
        );

        this.actions = [
            new GasolineAction("Oil Drill", new Currency(1, CurrencyType.Gasoline), "gasoline-first-machine"),
        ]

        this.conversionCount = 0;
    }

    conversionCost(): number {
        return this.conversionCount + 1
    }

    conversionGasolineGain(): number {
        return 1
    }

    convertOil() {
        const cost = new Currency(this.conversionCost(), CurrencyType.Oil)
        if (!App.game.wallet.hasCurrency(cost)) {
            return;
        }
        console.log("converting")

        this.conversionCount++;
        App.game.wallet.loseCurrency(cost);
        App.game.wallet.gainGasoline(this.conversionGasolineGain());
    }

    update(delta: number) {
        if (!this.canAccess()) {
            return;
        }

        if (App.game.settings.getSetting("auto-convert-oil")?.value) {
            this.convertOil();
        }

        // const speedMultiplier = (this.upgrades.getUpgrade("gasoline-automation-speed") as DiscreteUpgrade).getBonus();
        const speedMultiplier = 1;
        for (const action of this.actions) {

            action.progress(delta * speedMultiplier);
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

