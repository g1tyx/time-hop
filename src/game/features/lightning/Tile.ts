export class Tile {
    isReady: boolean = true;

    regenerateCurrent: number = 0;
    regenerateGoal: number;


    constructor(regenerateGoal: number) {
        this.regenerateGoal = regenerateGoal;
    }

    regenerate(delta: number) {
        this.regenerateCurrent += delta;
        if (this.regenerateCurrent > this.regenerateGoal) {
            this.regenerateCurrent = this.regenerateGoal;
            this.isReady = true;
        }
    }

    strike() {
        if (!this.isReady) {
            return;
        }

        this.isReady = false;

        console.log("yay")
    }
}
