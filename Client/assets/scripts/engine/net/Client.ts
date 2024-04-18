import EventName from "../../logic/const/EventName";
import { Msg } from "../msg/msg";

export default class Client {
    public url: string;
    private ws: WebSocket = null;

    public constructor(url: string) {
        this.url = url;

    }

    public Connect(onmessage: (event) => void): void {
        if (this.IsConnected()) return;
        this.ws = new WebSocket(this.url);
        this.ws.onopen = function (event) {
            Msg.emit(EventName.EVENT_CLIENT_CONNECT);
            console.log("WebSocket连接已打开");
        };

        this.ws.onmessage = onmessage;

        this.ws.onclose = function (event) {
            console.log("WebSocket连接已关闭");
        };

        this.ws.onerror = function (event) {
            console.error("WebSocket发生错误");
        };
    }

    public Send(data: string): void {
        if (!this.IsConnected()) {
            this.ws.send(data);
        }
    }

    public Close(): void {
        if (this.IsConnected()) {
            this.ws.close();
            this.ws = null;
        }
    }

    public IsConnected(): boolean {
        return null != this.ws && this.ws.readyState == WebSocket.CONNECTING;
    }
}