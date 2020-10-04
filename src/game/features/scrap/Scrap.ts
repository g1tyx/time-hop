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

export class Scrap extends Feature {
    name: string = "Scrap";
    saveKey: string = "scrap";

    upgrades: UpgradeList<Upgrade, UpgradeSaveData>;

    nextScrapGain: number;

    constructor() {
        super();
        this.upgrades = new UpgradeList<Upgrade, UpgradeSaveData>(
            [
                new DiscreteUpgrade("scrap-manual", UpgradeType.ScrapManual, "Gain more scraps while digging", 5,
                    CurrencyBuilder.createArray([10, 25, 50, 100, 250], CurrencyType.Scrap),
                    [0, 1, 2, 3, 4, 5], true),
                new SingleLevelUpgrade("scrap-unlock-automation", UpgradeType.ScrapAutomation, "Automatically produce scrap", new Currency(100, CurrencyType.Scrap), 1),
                new DiscreteUpgrade("scrap-automation-time", UpgradeType.ScrapAutomationSpeed, "Scrap automation time", 10,
                    CurrencyBuilder.createArray([100, 250, 500, 1000, 2500, 5000, 7500, 10000, 25000, 50000], CurrencyType.Scrap),
                    [1, 0.9, 0.85, 0.8, 0.766, 0.633, 0.6, 0.575, 0.55, 0.525, 0.5], false),
            ]
        );


        this.nextScrapGain = Date.now();
    }


    scrapGainManual(): number {
        return 1 + (this.upgrades.getUpgrade("scrap-manual") as DiscreteUpgrade).getBonus();
    }

    scrapAutomationTime(): number {
        return (this.upgrades.getUpgrade("scrap-automation-time") as DiscreteUpgrade).getBonus() * 1000;
    }

    hasScrapAutomation(): boolean {
        return (this.upgrades.getUpgrade("scrap-unlock-automation") as SingleLevelUpgrade).isBought();
    }

    digForScraps() {
        App.game.wallet.gainScrap(this.scrapGainManual());
    }

    update(delta: number) {
        if (!this.canAccess()) {
            return;
        }
        if (this.hasScrapAutomation()) {
            if (Date.now() > this.nextScrapGain) {
                App.game.wallet.gainScrap(10);
                this.nextScrapGain = Date.now() + this.scrapAutomationTime();
            }
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

}
