import {Saveable} from "@/engine/saving/Saveable";
import {SaveData} from "@/engine/saving/SaveData";

export abstract class Feature implements Saveable {
    abstract name: string;

    initialize(): void {
        // Override in subclass if needed
    }

    // Default false to avoid not implementing the proper restrictions
    canAccess(): boolean {
        return false;
    }


    update(delta: number): void {
        // Override in subclass if needed
    }

    abstract saveKey: string;

    abstract load(data: SaveData): void;

    abstract save(): SaveData;

    abstract parseSaveData(json: Record<string, unknown>): SaveData;

    getScrapMultiplier(): number {
        return 1;
    }

    getGasolineMultiplier(): number {
        return 1;
    }

    getLightningMultiplier(): number {
        return 1;
    }

    getPlutoniumMultiplier(): number {
        return 1;
    }
}
