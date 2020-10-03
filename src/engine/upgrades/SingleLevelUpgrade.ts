import {DiscreteUpgrade} from "@/engine/upgrades/DiscreteUpgrade";
import {Currency} from "@/engine/features/wallet/Currency";
import {UpgradeType} from "@/engine/upgrades/UpgradeType";

/**
 * An upgrade with a max level of 1
 */
export class SingleLevelUpgrade extends DiscreteUpgrade {

    constructor(identifier: string, type: UpgradeType, displayName: string, cost: Currency, bonus: number) {
        super(identifier, type, displayName, 1, [cost], [0, bonus], true);
    }

    isBought(): boolean {
        return this.isMaxLevel();
    }

}
