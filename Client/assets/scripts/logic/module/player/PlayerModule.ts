/** @format */

import { ModuleBase } from "../../../engine/module/ModuleBase";
import Player from "../../Proto/Player";

export class PlayerModule extends ModuleBase {
    public Players: Map<number, Player>;
    public Init() {
        super.Init();
        this.Players = new Map();
    }

    public AddPlayer(uid: number, name: string, isReady: false) {
        let p = this.GetPlayer(uid);
        if (null == p) {
            p = new Player(uid, name);
            this.Players.set(uid, p);
        } else {
            p.name = name;
        }
        p.isReady = isReady;
    }

    public HasPlayer(uid: number): boolean {
        return this.Players.has(uid);
    }

    public GetPlayer(uid: number): Player {
        return this.Players.get(uid);
    }

    public UpdatePlayers(players: Array<Player>) {
        this.Players.clear();
        for (let p of players) {
            this.Players.set(p.uid, p);
        }
    }
}
