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
import {OilSpeedup} from "@/game/features/gasoline/OilSpeedup";
import {ScrapMachineAction} from "@/game/features/gasoline/ScrapMachineAction";

export class Gasoline extends Feature {
    name: string = "Gasoline";
    saveKey: string = "gasoline";

    gasolineUpgrades: UpgradeList<Upgrade, UpgradeSaveData>;
    oilUpgrades: UpgradeList<Upgrade, UpgradeSaveData>;

    actions: GasolineAction[]

    // How often we've converted oil to gasoline already
    conversionCount: number;

    oilSpeedups: OilSpeedup[];
    selectedOilSpeedup: number;

    constructor() {
        super();
        this.oilUpgrades = new UpgradeList<Upgrade, UpgradeSaveData>(
            [
                new DiscreteUpgrade("oil-global-value", UpgradeType.OilValue, "Increase oil value", 3,
                    CurrencyBuilder.createArray([25, 50, 100], CurrencyType.Oil), [1, 2, 3, 4], true)
            ]
        )


        this.gasolineUpgrades = new UpgradeList<Upgrade, UpgradeSaveData>(
            [

            ]
        );

        this.actions = [
            new GasolineAction(
                1,
                new DiscreteUpgrade("gasoline-first-machine", UpgradeType.GasolineMachine, "Dig randomly", 3,
                CurrencyBuilder.createArray([1, 5, 10], CurrencyType.Gasoline), [0, 1, 2, 3], true)
            ),
            new GasolineAction(
                3,
                new DiscreteUpgrade("gasoline-second-machine", UpgradeType.GasolineMachine, "Purify the Ocean", 3,
                CurrencyBuilder.createArray([1, 5, 10], CurrencyType.Gasoline), [0, 1, 2, 3], true)
            ),
            new GasolineAction(
                10,
                new DiscreteUpgrade("gasoline-third-machine", UpgradeType.GasolineMachine, "Oil Drill", 3,
                    CurrencyBuilder.createArray([1, 5, 10], CurrencyType.Gasoline), [0, 1, 2, 3], true)
            ),
            new GasolineAction(
                20,
                new DiscreteUpgrade("gasoline-fourth-machine", UpgradeType.GasolineMachine, "Drilling Platform", 3,
                    CurrencyBuilder.createArray([1, 5, 10], CurrencyType.Gasoline), [0, 1, 2, 3], true)
            ),
            new ScrapMachineAction(
                50,
                new DiscreteUpgrade("gasoline-scrap-machine", UpgradeType.GasolineMachine, "Scrap Machine", 3,
                    CurrencyBuilder.createArray([1, 5, 10], CurrencyType.Gasoline), [0, 1, 2, 3], true)
            )
        ]

        this.oilSpeedups = [
            new OilSpeedup("None", 0, 1),
            new OilSpeedup("1.5x", 1, 1.5),
            new OilSpeedup("2x", 5, 2),
            new OilSpeedup("3x", 50, 3),
            new OilSpeedup("4x", 250, 4),
            new OilSpeedup("5x", 1000, 5),
        ]

        this.conversionCount = 0;
        this.selectedOilSpeedup = 0;
    }


    getOilMultiplier(): number {
        return this.oilUpgrades.getTotalMultiplierForType(UpgradeType.OilValue);
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

        this.conversionCount++;
        App.game.wallet.loseCurrency(cost);
        App.game.wallet.gainGasoline(this.conversionGasolineGain());
    }

    update(delta: number) {
        if (!this.canAccess()) {
            return;
        }

        if (App.game.settings.getSetting("auto-convert-oil")?.value) {
            // Give the player a small buffer so their oil speedup doesn't run out.
            const cost = new Currency(this.conversionCost() + this.oilSpeedups[this.selectedOilSpeedup].oilPerSecond, CurrencyType.Oil)
            if (App.game.wallet.hasCurrency(cost)) {
                this.convertOil();

            }
        }

        // const speedMultiplier = (this.gasolineUpgrades.getUpgrade("gasoline-automation-speed") as DiscreteUpgrade).getBonus();
        const speedMultiplier = 1;

        // Oil speedups
        const speedup = this.oilSpeedups[this.selectedOilSpeedup];
        let oilSpeedupMultiplier;

        const speedupCost = new Currency(speedup.oilPerSecond * delta, CurrencyType.Oil);
        if (!App.game.wallet.hasCurrency(speedupCost)) {
            this.selectedOilSpeedup = 0;
            oilSpeedupMultiplier = 1
        } else {
            oilSpeedupMultiplier = speedup.speedMultiplier;
            App.game.wallet.loseCurrency(speedupCost)
        }

        for (const action of this.actions) {

            action.progress(delta * speedMultiplier * oilSpeedupMultiplier);
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

