import {Feature} from "@/game/Feature";
import {ScrapSaveData} from "@/game/features/scrap/ScrapSaveData";
import {App} from "@/App.ts";
import {TimeLineState} from "@/game/features/timeline/TimeLineState";
import {UpgradeList} from "@/engine/upgrades/UpgradeList";
import {Upgrade} from "@/engine/upgrades/Upgrade";
import {UpgradeSaveData} from "@/engine/upgrades/UpgradeSaveData";
import {UpgradeType} from "@/engine/upgrades/UpgradeType";
import {CurrencyBuilder} from "@/engine/features/wallet/CurrencyBuilder";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {DiscreteUpgrade} from "@/engine/upgrades/DiscreteUpgrade";
import {SingleLevelUpgrade} from "@/engine/upgrades/SingleLevelUpgrade";
import {Currency} from "@/engine/features/wallet/Currency";
import {ScrapAction} from "@/game/features/scrap/ScrapAction";
import {MultiRequirement} from "@/engine/requirements/MultiRequirement";
import {StatisticRequirement} from "@/engine/requirements/StatisticRequirement";
import {StatisticType} from "@/engine/features/statistics/StatisticType";

export class Scrap extends Feature {
    name: string = "Scrap";
    saveKey: string = "scrap";

    upgrades: UpgradeList<Upgrade, UpgradeSaveData>;

    actions: ScrapAction[]

    constructor() {
        super();
        this.upgrades = new UpgradeList<Upgrade, UpgradeSaveData>(
            [
                new SingleLevelUpgrade("scrap-unlock-dig-automation", UpgradeType.ScrapAutomation, "Automatically dig for scraps", new Currency(100, CurrencyType.Scrap), 1),
                new SingleLevelUpgrade("scrap-unlock-recycle-automation", UpgradeType.ScrapAutomation, "Automatically recycle stuff", new Currency(100, CurrencyType.Scrap), 1),
                new DiscreteUpgrade("scrap-dig-value", UpgradeType.ScrapValue, "Dig value", 10,
                    CurrencyBuilder.createArray([10, 25, 50, 100, 250, 500, 750, 1000, 2500, 5000], CurrencyType.Scrap),
                    [1, 1.25, 1.5, 1.75, 2, 2.33, 2.66, 3, 3.5, 4, 5], true),
                new DiscreteUpgrade("scrap-recycle-value", UpgradeType.ScrapValue, "Recycle value", 10,
                    CurrencyBuilder.createArray([100, 250, 500, 1000, 2500, 5000, 7500, 10000, 25000, 50000], CurrencyType.Scrap),
                    [1, 1.25, 1.5, 1.75, 2, 2.33, 2.66, 3, 3.5, 4, 5], true),
            ]
        );

        this.actions = [
            new ScrapAction("Dig for scraps", 5, 1, "scrap-unlock-dig-automation", "scrap-dig-value"),
            new ScrapAction("Recycle stuff ", 10, 5, "scrap-unlock-recycle-automation", "scrap-recycle-value", new MultiRequirement([new StatisticRequirement(StatisticType.TotalScrapGained, 10)])),
        ]
    }


    update(delta: number) {
        if (!this.canAccess()) {
            return;
        }

        for (const action of this.actions) {
            action.progress(delta);
        }
    }

    load(data: ScrapSaveData): void {
        // Empty
    }


    canAccess(): boolean {
        return App.game.timeLine.state >= TimeLineState.Scrap && App.game.wallet.hasCurrency(new Currency(1, CurrencyType.Scrap));
    }

    parseSaveData(json: Record<string, unknown>): ScrapSaveData {
        return new ScrapSaveData();
    }

    save(): ScrapSaveData {
        return new ScrapSaveData();
    }

    reset() {
        for (const upgrade of this.upgrades.list) {
            upgrade.level = 0;
        }
    }
}
