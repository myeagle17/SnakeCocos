import { WebSocket } from "ws";

export default class Player {
    public uid: number;
    public name: string;
    public ws: WebSocket;
    public isReady: boolean;
    public constructor(uid: number, name: string, ws: WebSocket) {
        this.uid = uid;
        this.name = name;
        this.ws = ws;
        this.isReady = false;
    }
}