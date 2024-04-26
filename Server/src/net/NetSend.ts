/** @format */

import { WebSocket } from "ws";
import { IProto } from "../Proto/Proto";
import PlayerManager from "../player/PlayerManager";

export default class NetSend {
    public static SendByWs(ws: WebSocket, msgID: string, data: any = null) {
        let proto: IProto = { ID: msgID, Data: data || {} };
        ws.send(JSON.stringify(proto));
    }

    public static Send(uid: number, msgID: string, data: any = null): void {
        NetSend.SendByWs(PlayerManager.Instance().GetWsByUID(uid), msgID, data);
    }
}
