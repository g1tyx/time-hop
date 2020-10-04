import {StatisticsSaveData} from "./StatisticsSaveData";
import {Statistic} from "./Statistic";
import {NumberStatistic} from "./NumberStatistic";
import {StatisticsValue} from "./StatisticsValueType";
import {Feature} from "@/game/Feature";
import {App} from "@/App.ts";
import {StatisticType} from "@/engine/features/statistics/StatisticType";

/**
 * Statistics class to keep track of increasing numbers
 */
export class Statistics extends Feature {
    name = "Statistics";
    saveKey = "statistics";

    list: Record<StatisticType, Statistic>


    constructor() {
        super();
        this.list = {} as Record<StatisticType, Statistic>;
    }

    initialize(): void {
        this.registerStatistic(new NumberStatistic(StatisticType.TotalScrapGained, 'Total scrap'))
        this.registerStatistic(new NumberStatistic(StatisticType.TotalGasolineGained, 'Total gasoline'))
        this.registerStatistic(new NumberStatistic(StatisticType.TotalLightningGained, 'Total lightning'))
        this.registerStatistic(new NumberStatistic(StatisticType.TotalPlutoniumGained, 'Total plutonium'))

        App.game.wallet.onScrapGain.subscribe((amount: number) => this.incrementNumberStatistic(StatisticType.TotalScrapGained, amount));
        App.game.wallet.onGasolineGain.subscribe((amount: number) => this.incrementNumberStatistic(StatisticType.TotalGasolineGained, amount));
        App.game.wallet.onLightningGain.subscribe((amount: number) => this.incrementNumberStatistic(StatisticType.TotalLightningGained, amount));
        App.game.wallet.onPlutoniumGain.subscribe((amount: number) => this.incrementNumberStatistic(StatisticType.TotalPlutoniumGained, amount));
    }

    incrementNumberStatistic(key: StatisticType, amount = 1): void {
        if (!this.hasStatistic(key)) {
            console.warn(`Could not find statistic with key ${key}`)
            return;
        }
        this.list[key].value += amount;
    }

    public getStatistic(key: StatisticType): Statistic | null {
        if (!this.hasStatistic(key)) {
            console.warn(`Could not find statistic with key ${key}`)

            return null;
        } else {
            return this.list[key];
        }
    }

    private hasStatistic(key: StatisticType): boolean {
        return key in this.list
    }

    private registerStatistic(statistic: Statistic) {
        this.list[statistic.key] = statistic;
    }

    load(data: StatisticsSaveData): void {
        for (const key in data.list) {
            if (Object.prototype.hasOwnProperty.call(data.list, key)) {
                if (this.hasStatistic(key as StatisticType)) {
                    this.list[key as StatisticType].value = data.list[key as StatisticType];
                } else {
                    console.warn(`Could not load statistic ${key}`)
                }
            }
        }
    }

    parseSaveData(json: Record<string, unknown>): StatisticsSaveData {
        const data = new StatisticsSaveData();
        const list = json.list as Record<string, StatisticsValue>;
        for (const key in list) {
            if (Object.prototype.hasOwnProperty.call(list, key)) {
                data.addStatistic(key as StatisticType , list[key])
            }
        }
        return data;
    }

    save(): StatisticsSaveData {
        const data = new StatisticsSaveData();
        for (const key in this.list) {
            data.addStatistic(key as StatisticType, this.list[key as StatisticType].value);
        }
        return data;
    }

}
