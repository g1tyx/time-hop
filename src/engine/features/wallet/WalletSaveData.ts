import {SaveData} from "@/engine/saving/SaveData";

export class WalletSaveData extends SaveData {
    scrap: number;
    gasoline: number;
    lightning: number;
    uranium: number;


    constructor(scrap: number, gasoline: number, lightning: number, uranium: number) {
        super();
        this.scrap = scrap;
        this.gasoline = gasoline;
        this.lightning = lightning;
        this.uranium = uranium;
    }
}
