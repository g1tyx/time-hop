import {Feature} from "@/game/Feature";
import {App} from "@/App.ts";
import {UpgradeList} from "@/engine/upgrades/UpgradeList";
import {Upgrade} from "@/engine/upgrades/Upgrade";
import {UpgradeSaveData} from "@/engine/upgrades/UpgradeSaveData";
import {LightningSaveData} from "@/game/features/lightning/LightningSaveData";
import {Grid} from "@/game/features/lightning/Grid";
import {Currency} from "@/engine/features/wallet/Currency";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {WeightedDistribution} from "@/engine/probability/WeightedDistribution";
import {LightningReward} from "@/game/features/lightning/LightningReward";
import {Outcome} from "@/engine/probability/Outcome";
import {Random} from "@/engine/probability/Random";

export class Lightning extends Feature {
    name: string = "Lightning";
    saveKey: string = "lightning";

    upgrades: UpgradeList<Upgrade, UpgradeSaveData>;

    bolts: number;

    grid: Grid;
    conversionCount: number;

    // Rewards
    rods: number;
    autoStrikes: number;
    regenTime: number;
    conversionGain: number;

    rewardDistribution: WeightedDistribution<LightningReward>;

    nextAutoStrike: number;

    constructor() {
        super();
        this.upgrades = new UpgradeList<Upgrade, UpgradeSaveData>(
            []
        );

        this.bolts = 0;

        this.rewardDistribution = new WeightedDistribution<LightningReward>([
            new Outcome<LightningReward>(LightningReward.Nothing, 1),
            new Outcome<LightningReward>(LightningReward.Rods, 6),
            new Outcome<LightningReward>(LightningReward.ConversionGain, 4),
            new Outcome<LightningReward>(LightningReward.AutoStrike, 1.5),
            new Outcome<LightningReward>(LightningReward.Oil, 0.3),
            new Outcome<LightningReward>(LightningReward.RegenTime, 2),
        ])

        this.grid = new Grid(this.rewardDistribution);

        this.rods = 1;
        this.autoStrikes = 0;
        this.regenTime = 0;
        this.conversionGain = 0;

        this.conversionCount = 0;

        this.nextAutoStrike = Date.now();


    }

    tileRegenTime(): number {
        return 3 / (1 + Math.sqrt(this.regenTime / 10));
    }

    autoStrikeTime() {
        return Math.max(100, 2000 / (1 + this.autoStrikes / 3));
    }

    autoStrikeAmount() {
        if (this.autoStrikeTime() > 100) {
            return 1;
        }
        return 1 + Math.sqrt(this.autoStrikes / 3);
    }

    autoStrike() {
        for (let i = 0; i < this.autoStrikeAmount(); i++) {
            this.nextAutoStrike = Date.now() + this.autoStrikeTime();
            const x = Random.intBetween(0, this.grid.width);
            const y = Random.intBetween(0, this.grid.height);
            this.strike(x, y);
        }
    }

    strike(x: number, y: number) {
        if (!this.grid.grid[y][x].isReady) {
            return;
        }
        if (this.bolts >= 1) {
            this.bolts--;
            const reward = this.grid.strike(x, y);
            this.gainReward(reward);
            this.grid.grid[y][x].setReward(this.rewardDistribution.draw());
        }
    }

    oilConvert() {
        const cost = new Currency(App.game.timeLine.OIL_GOAL, CurrencyType.Oil);
        if (App.game.wallet.hasCurrency(cost)) {
            App.game.wallet.loseCurrency(cost);
            App.game.wallet.gainGasoline(1);
        }
    }

    gainReward(reward: LightningReward) {
        switch (reward) {
            case LightningReward.Nothing:
                return;
            case LightningReward.Rods:
                this.rods++;
                return;
            case LightningReward.AutoStrike:
                this.autoStrikes++;
                return;
            case LightningReward.Oil:
                App.game.wallet.gainOil(1);
                return;
            case LightningReward.RegenTime:
                this.regenTime++;
                return;
            case LightningReward.ConversionGain:
                this.conversionGain++;
                return;
        }
    }

    conversionCost(): number {
        return (this.conversionCount / 4) + 1;
    }

    conversionBoltGain(): number {
        return 1 + Math.sqrt(this.conversionGain / 10);
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

        if (App.game.settings.getSetting("auto-strike-bolts")?.value) {
            if (Date.now() > this.nextAutoStrike) {
                this.autoStrike();
            }
        }

        App.game.wallet.gainLightning(this.rods * delta);

        this.grid.regenerateCells(delta / this.tileRegenTime());
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

