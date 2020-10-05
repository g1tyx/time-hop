import {Tile} from "@/game/features/lightning/Tile";

export class Grid {
    grid: Tile[][];


    width: number = 10;
    height: number = 10;

    constructor() {
        this.grid = [];
        for (let y = 0; y < this.height; y++) {
            const row = [];
            for (let x = 0; x < this.width; x++) {
                row.push(new Tile(10));
            }
            this.grid.push(row);
        }
    }

    strike(x: number, y: number) {
        this.grid[y][x].strike();
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
