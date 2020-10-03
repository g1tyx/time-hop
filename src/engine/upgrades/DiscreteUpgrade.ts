import {Upgrade} from "@/engine/upgrades/Upgrade";
import {Currency} from "@/engine/features/wallet/Currency";
import {CurrencyType} from "@/engine/features/wallet/CurrencyType";
import {UpgradeType} from "@/engine/upgrades/UpgradeType";

export class DiscreteUpgrade extends Upgrade {

    costList: Currency[] = [];
    bonusList: number[] = []

    constructor(identifier: string, type: UpgradeType, displayName: string, maxLevel: number, costList: Currency[], bonusList: number[], increasing: boolean) {
        super(identifier, type, displayName, maxLevel, increasing);
        this.costList = costList;
        this.bonusList = bonusList;
    }

    getCost(): Currency {
        if (this.isMaxLevel()) {
            return new Currency(Infinity, CurrencyType.Scrap);
        }
        return this.costList[this.level];
    }


    getBonus(level: number = this.level): number {
        return this.bonusList[level];
    }

}
