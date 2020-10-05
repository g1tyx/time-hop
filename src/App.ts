import {Game} from "./game/Game";
import {Wallet} from "./engine/features/wallet/Wallet";
import {Settings} from "@/engine/features/settings/Settings";
import {Statistics} from "@/engine/features/statistics/Statistics";
import {Achievements} from "@/engine/features/achievements/Achievements";
import {TimeLine} from "@/game/features/timeline/TimeLine";
import {Scrap} from "@/game/features/scrap/Scrap";
import {Gasoline} from "@/game/features/gasoline/Gasoline";
import {Lightning} from "@/game/features/lightning/Lightning";
import {Plutonium} from "@/game/features/plutonium/Plutonium";

export class App {

    static readonly debug = false;
    static game: Game;



    static start(): void {
        this.game = this.createNewGame()
        this.game.initialize();
        // this.game.load();
        this.game.start();
    }

    static createNewGame(): Game {
        return new Game(
            new TimeLine(),
            new Scrap(),
            new Gasoline(),
            new Lightning(),
            new Plutonium(),
            new Wallet(),
            new Settings(),
            new Statistics(),
            new Achievements(),
        );
    }
}
