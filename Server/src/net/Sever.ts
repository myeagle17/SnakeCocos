/** @format */

import ws from "ws";
import Player from "../Proto/Player";
import { IProto } from "../Proto/Proto";
import EventMgr from "../EventMgr";
import PlayerManager from "../player/PlayerManager";

export default class Server {
    private server: ws.Server = null;
    public Start(nPort: number): void {
        this.server = new ws.Server({ port: nPort });
        this.server.on("connection", function connection(ws, req) {
            const ip = req.socket.remoteAddress;
            const port = req.socket.remotePort;
            const clientName = ip + port;

            console.log("%s is connected ", clientName);

            ws.on("message", function incoming(buffer: Buffer) {
                let message = buffer.toString();
                try {
                    var data: IProto = JSON.parse(message);
                    EventMgr.Emit(data.ID, data.Data, ws);
                } catch (e) {
                    console.error(e);
                }
            });
            ws.on("error", function (message) {
                console.log("error");
            });
            ws.on("close", function () {
                console.log("close");
                let uid = PlayerManager.Instance().GetUIDByWs(ws);
                PlayerManager.Instance().RemovePlayerByUID(uid);
            });
        });
    }
}
