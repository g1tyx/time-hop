import {Feature} from "@/game/Feature";
import {TimeLineState} from "@/game/features/timeline/TimeLineState";
import {TimeLineSaveData} from "@/game/features/timeline/TimeLineSaveData";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {Currency} from "@/engine/features/wallet/Currency";
import {App} from "@/App";
import {StatisticType} from "@/engine/features/statistics/StatisticType";
import {NumberStatistic} from "@/engine/features/statistics/NumberStatistic";


export class TimeLine extends Feature {
    name: string = "Timeline";
    saveKey: string = "timeline";

    state: TimeLineState;

    canAccessScrap: boolean = false;
    canAccessGasoline: boolean = false;
    canAccessLightning: boolean = false;
    canAccessPlutonium: boolean = false;

    public readonly SCRAP_GOAL: number = 10000;


    public readonly START_STATE: TimeLineState = TimeLineState.Gasoline;

    constructor() {
        super();
        this.state = this.START_STATE;
    }


    initialize() {
        this.giveStartingCurrency();
    }

    update(delta: number) {
        if (App.game.wallet.getAmount(CurrencyType.Scrap) > 0) {
            this.canAccessScrap = true;
        }
        if (App.game.wallet.getAmount(CurrencyType.Gasoline) > 0) {
            this.canAccessGasoline = true;
        }
        if (App.game.wallet.getAmount(CurrencyType.Lightning) > 0) {
            this.canAccessLightning = true;
        }
        if (App.game.wallet.getAmount(CurrencyType.Plutonium) > 0) {
            this.canAccessPlutonium = true;
        }
    }

    timeTravel() {
        if (!this.canTimeTravel()) {
            return;
        }


        App.game.wallet.loseAll();
        App.game.scrap.reset();
        App.game.gasoline.reset();
        App.game.lightning.reset();
        App.game.plutonium.reset();


        // Reset prestige statistics
        (App.game.statistics.getStatistic(StatisticType.TotalScrapGainedThisPrestige) as NumberStatistic).value = 0;
        (App.game.statistics.getStatistic(StatisticType.TotalGasolineGainedThisPrestige) as NumberStatistic).value = 0;
        (App.game.statistics.getStatistic(StatisticType.TotalLightningGainedThisPrestige) as NumberStatistic).value = 0;
        (App.game.statistics.getStatistic(StatisticType.TotalPlutoniumGainedThisPrestige) as NumberStatistic).value = 0;

        this.canAccessScrap = false;
        this.canAccessGasoline = false;
        this.canAccessLightning = false;
        this.canAccessPlutonium = false;

        this.state = Math.min(TimeLineState.FluxCapacitor, this.state + 1);
        this.giveStartingCurrency();
    }

    canTimeTravel() {
        return App.game.wallet.hasCurrency(new Currency(this.SCRAP_GOAL, CurrencyType.Scrap));
    }

    load(data: TimeLineSaveData): void {
        this.state = data.state;
    }

    parseSaveData(json: Record<string, unknown>): TimeLineSaveData {
        return new TimeLineSaveData(json.state as TimeLineState ?? this.START_STATE);
    }

    save(): TimeLineSaveData {
        return new TimeLineSaveData(this.state);
    }

    private giveStartingCurrency() {
        switch (this.state) {
            case TimeLineState.Scrap:
                App.game.wallet.gainScrap(1);
                break;
            case TimeLineState.Gasoline:
                App.game.wallet.gainGasoline(1);
                break;
            case TimeLineState.Lightning:
                App.game.wallet.gainLightning(1);
                break;
            case TimeLineState.Plutonium:
                App.game.wallet.gainPlutonium(1);
                break;
            case TimeLineState.FluxCapacitor:
                App.game.wallet.gainPlutonium(10);
                break;
        }
    }
}
