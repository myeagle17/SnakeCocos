import { WebSocket } from "ws";
import EventMgr from "../EventMgr";
import NetEvent from "../Proto/NetEvent";
import { IProto, C2SLogin, S2CLoginProto } from "../Proto/Proto";
import Player from "./Player";
import NetLogin from "../net/NetLogin";

export default class ModulePlayer {
    public Players: Array<Player>;
    public curUID: number = 0;
    public Init(): void {
        this.Players = new Array();
        this.curUID = 0;
        EventMgr.On(NetEvent.C2S_LOGIN, this.OnLogin);
    }

    public clear(): void {

    }

    public OnLogin(data: C2SLogin, ws: WebSocket): void {
        console.log("login:" + data.name);
        let p = this.AddPlayer(data.name, ws);
        NetLogin.SendLogin(ws, true, p.uid, p.uid, p.name);
        // broadcast
        NetLogin.SendBroadLoginState(this.Players);
    }

    public SendAll(ID: string, data: any): void {
        for (const player of this.Players) {
            player.ws.send(JSON.stringify({ ID: NetEvent.S2C_LOGIN, Data: data || {} }));
        }
    }

    public AddPlayer(name: string, ws: WebSocket): Player {
        let p: Player = new Player(this.curUID++, name, ws);
        this.Players.push(p);
        return p;
    }
}