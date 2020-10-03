import {Currency} from "./Currency";
import {CurrencyType} from "./CurrencyType";
import {Feature} from "@/game/Feature";
import {WalletSaveData} from "@/engine/features/wallet/WalletSaveData";

import {SimpleEventDispatcher, ISimpleEvent} from "strongly-typed-events";
import {App} from "@/App";


export class Wallet extends Feature {
    name = 'Wallet';
    currencies: { [key: string]: number } = {}

    private _onScrapGain = new SimpleEventDispatcher<number>();

    constructor() {
        super();
        this.currencies[CurrencyType[CurrencyType.Scrap]] = 0;
        this.currencies[CurrencyType[CurrencyType.Gasoline]] = 0;
        this.currencies[CurrencyType[CurrencyType.Lightning]] = 0;
        this.currencies[CurrencyType[CurrencyType.Uranium]] = 0;
    }

    public gainScrap(base: number): number {

        const scrap = base * App.game.getTotalScrapMultiplier();

        this._onScrapGain.dispatch(scrap);
        this.addCurrency(new Currency(scrap, CurrencyType.Scrap));
        return scrap;
    }


    private addCurrency(currency: Currency) {
        if (isNaN(currency.amount) || currency.amount <= 0) {
            console.trace(`Could not add currency ${currency.toString()}`);
            return;
        }

        this.currencies[CurrencyType[currency.type]] += currency.amount;
    }

    public hasCurrency(currency: Currency) {
        return this.currencies[CurrencyType[currency.type]] >= currency.amount;
    }

    public loseCurrency(currency: Currency) {
        if (isNaN(currency.amount) || currency.amount <= 0) {
            console.trace(`Could not lose currency ${currency.toString()}`);
            return;
        }

        this.currencies[CurrencyType[currency.type]] -= currency.amount;
    }

    saveKey: string = "wallet";

    load(data: WalletSaveData): void {
        this.currencies[CurrencyType[CurrencyType.Scrap]] = data.scrap;
        this.currencies[CurrencyType[CurrencyType.Gasoline]] = data.gasoline;
        this.currencies[CurrencyType[CurrencyType.Lightning]] = data.lightning;
        this.currencies[CurrencyType[CurrencyType.Uranium]] = data.uranium;
    }

    parseSaveData(json: Record<string, unknown>): WalletSaveData {
        return new WalletSaveData(json?.scrap as number ?? 0, json?.gasoline as number ?? 0, json?.lightning as number ?? 0, json?.uranium as number ?? 0)
    }

    save(): WalletSaveData {
        return new WalletSaveData(
            this.currencies[CurrencyType[CurrencyType.Scrap]],
            this.currencies[CurrencyType[CurrencyType.Gasoline]],
            this.currencies[CurrencyType[CurrencyType.Lightning]],
            this.currencies[CurrencyType[CurrencyType.Uranium]],
        );
    }

    public get onScrapGain(): ISimpleEvent<number> {
        return this._onScrapGain.asEvent();
    }

}
