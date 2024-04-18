import WebSocket from "ws";
import NetEvent from "../Proto/NetEvent";
import { S2CLoginProto, IProto, S2CBroadLoginState } from "../Proto/Proto";
import { send } from "process";
import Player from "../player/Player";

export default class NetLogin {
    public static SendLogin(ws: WebSocket, ret: boolean, sender: number, uid: number, name: string) {
        let loginProto: S2CLoginProto = {
            ret: ret,
            sender: sender,
            uid: uid,
            name: name,
        }
        let proto: IProto = { ID: NetEvent.S2C_LOGIN, Data: loginProto };

        ws.send(JSON.stringify(proto));
    }

    public static SendBroadLoginState(players: Array<Player>) {
        let sumOfReady = 0;
        for (const player of players) {
            if (player.isReady) {
                sumOfReady++;
            }
        }
        let singleProto: S2CBroadLoginState = { sumOfReady: sumOfReady, sumOfAll: players.length };
        let proto: IProto = { ID: NetEvent.S2C_BROAD_LOGIN_STATE, Data: singleProto };
        let msg = JSON.stringify(proto);
        for (const player of players) {
            player.ws.send(msg);
        }
    }
}