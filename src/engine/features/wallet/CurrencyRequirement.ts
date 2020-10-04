import {Requirement} from "@/engine/requirements/Requirement";
import {Currency} from "@/engine/features/wallet/Currency";
import {App} from "@/App";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";

export class CurrencyRequirement extends Requirement {

    currency: Currency;


    constructor(amount: number, type: CurrencyType) {
        super();
        this.currency = new Currency(amount, type);
    }

    getActualValue(): number {
        return App.game.wallet.getAmount(this.currency.type);
    }

    getTargetValue(): number {
        return this.currency.amount;
    }

    lockedReason(): string {
        return "You need ";
    }

}
