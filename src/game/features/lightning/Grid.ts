import {Tile} from "@/game/features/lightning/Tile";
import {LightningReward} from "@/game/features/lightning/LightningReward";
import {WeightedDistribution} from "@/engine/probability/WeightedDistribution";

export class Grid {
    grid: Tile[][];

    width: number = 10;
    height: number = 10;

    constructor(rewardDistribution: WeightedDistribution<LightningReward>) {
        this.grid = [];
        for (let y = 0; y < this.height; y++) {
            const row = [];
            for (let x = 0; x < this.width; x++) {
                row.push(new Tile(10, rewardDistribution.draw()));
            }
            this.grid.push(row);
        }
    }

    strike(x: number, y: number): LightningReward {
        return this.grid[y][x].strike();
    }

    regenerateCells(delta: number) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const tile = this.grid[y][x];
                if (!tile.isReady) {
                    tile.regenerate(delta);
                }
            }
        }
    }
}
