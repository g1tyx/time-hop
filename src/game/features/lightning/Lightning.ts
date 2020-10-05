import {Feature} from "@/game/Feature";
import {App} from "@/App.ts";
import {TimeLineState} from "@/game/features/timeline/TimeLineState";
import {UpgradeList} from "@/engine/upgrades/UpgradeList";
import {Upgrade} from "@/engine/upgrades/Upgrade";
import {UpgradeSaveData} from "@/engine/upgrades/UpgradeSaveData";
import {LightningSaveData} from "@/game/features/lightning/LightningSaveData";
import {Grid} from "@/game/features/lightning/Grid";
import {UpgradeType} from "@/engine/upgrades/UpgradeType";
import {Currency} from "@/engine/features/wallet/Currency";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";

export class Lightning extends Feature {
    name: string = "Lightning";
    saveKey: string = "lightning";

    upgrades: UpgradeList<Upgrade, UpgradeSaveData>;

    bolts: number;

    grid: Grid;
    conversionCount: number;

    constructor() {
        super();
        this.upgrades = new UpgradeList<Upgrade, UpgradeSaveData>(
            []
        );

        this.grid = new Grid();
        this.bolts = 0;
        this.conversionCount = 0;
    }

    strike(x: number, y: number) {
        if (this.bolts > 0) {
            this.bolts--;
            this.grid.strike(x, y);
        }
    }

    conversionCost(): number {
        return this.conversionCount + 10
    }

    conversionBoltGain(): number {
        return 1
    }

    convertLightning() {
        const cost = new Currency(this.conversionCost(), CurrencyType.Lightning)
        if (!App.game.wallet.hasCurrency(cost)) {
            return;
        }

        this.conversionCount++;
        App.game.wallet.loseCurrency(cost);
        this.bolts += this.conversionBoltGain();
    }


    update(delta: number) {
        if (!this.canAccess()) {
            return;
        }

        if (App.game.settings.getSetting("auto-convert-bolts")?.value) {
            for (let i = 0; i < 100; i++) {
                const cost = new Currency(this.conversionCost(), CurrencyType.Lightning)
                if (App.game.wallet.hasCurrency(cost)) {
                    this.convertLightning();
                } else {
                    break;
                }

            }
        }

        this.grid.regenerateCells(delta);
        App.game.wallet.gainLightning(delta);
    }

    load(data: LightningSaveData): void {
        // Empty
    }


    canAccess(): boolean {
        return App.game.timeLine.canAccessLightning;
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

