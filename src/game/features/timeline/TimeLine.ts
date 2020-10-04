import {Feature} from "@/game/Feature";
import {TimeLineState} from "@/game/features/timeline/TimeLineState";
import {TimeLineSaveData} from "@/game/features/timeline/TimeLineSaveData";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {Currency} from "@/engine/features/wallet/Currency";
import {App} from "@/App";


export class TimeLine extends Feature {
    name: string = "Timeline";
    saveKey: string = "timeline";

    state: TimeLineState;

    canAccessScrap: boolean = false;
    canAccessGasoline: boolean = false;
    canAccessLightning: boolean = false;
    canAccessPlutonium: boolean = false;

    constructor() {
        super();
        this.state = TimeLineState.Scrap;
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


        this.canAccessScrap = false;
        this.canAccessGasoline = false;
        this.canAccessLightning = false;
        this.canAccessPlutonium = false;

        // Award starting cash
        switch (this.state) {
            case TimeLineState.Scrap:
                this.state = TimeLineState.Gasoline
                App.game.wallet.gainGasoline(1);
                break;
            case TimeLineState.Gasoline:
                this.state = TimeLineState.Lightning
                App.game.wallet.gainLightning(1);
                break;
            case TimeLineState.Lightning:
                this.state = TimeLineState.Plutonium
                App.game.wallet.gainPlutonium(1);
                break;
            case TimeLineState.Plutonium:
                this.state = TimeLineState.FluxCapacitor
                App.game.wallet.gainPlutonium(10);
                break;
            case TimeLineState.FluxCapacitor:
                console.log("You win, good job mate");
                App.game.wallet.gainPlutonium(1);
                break;
        }
    }

    canTimeTravel() {
        return App.game.wallet.hasCurrency(new Currency(1000000, CurrencyType.Scrap));
    }

    load(data: TimeLineSaveData): void {
        this.state = data.state;
    }

    parseSaveData(json: Record<string, unknown>): TimeLineSaveData {
        return new TimeLineSaveData(json.state as TimeLineState ?? TimeLineState.Scrap);
    }

    save(): TimeLineSaveData {
        return new TimeLineSaveData(this.state);
    }

}
