/** @format */

import { WebSocket } from "ws";
import Player from "../Proto/Player";

export default class PlayerManager {
    public Players: Array<Player>;
    public Ws: Map<number, WebSocket>;
    public curUID: number = 0;
    private static ince: PlayerManager = null;

    private constructor() {
        this.Players = new Array();
        this.Ws = new Map();
        this.curUID = 0;
    }

    public static Instance(): PlayerManager {
        if (null == PlayerManager.ince) {
            PlayerManager.ince = new PlayerManager();
        }
        return PlayerManager.ince;
    }

    public AddPlayer(name: string, ws: WebSocket): Player {
        let p: Player = new Player(this.curUID++, name);
        this.Players.push(p);
        this.Ws.set(p.uid, ws);
        return p;
    }

    public GetPlayer(uuid: number): Player {
        return this.Players.find((p) => p.uid == uuid);
    }

    public GetWsByPlayer(player: Player): WebSocket {
        if (null == player) return null;
        return this.Ws.get(player.uid);
    }

    public GetWsByUID(uid: number): WebSocket {
        return this.Ws.get(uid);
    }

    public GetUIDByWs(ws: WebSocket): number {
        let uid = -1;
        this.Ws.forEach((val, key) => {
            if (ws == val) uid = key;
        });
        return uid;
    }

    public RemovePlayerByUID(uid: number) {
        let index = this.Players.findIndex((p) => p.uid == uid);
        if (index >= 0) {
            this.Players.splice(index, 1);
        }
    }
}
