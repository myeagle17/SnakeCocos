import { IProto } from "../../logic/Proto/Proto";
import { Msg } from "../msg/msg";
import Client from "./Client";

export default class Net {
    private static Client: Client;
    private static IsInit: boolean = false;
    public static Init(url: string) {
        if (Net.IsInit) {
            console.log("It's Init");
            return;
        }
        Net.IsInit = true;
        Net.Client = new Client(url);
    }

    public static Connect(): void {
        if (!Net.IsInit) return;
        Net.Client.Connect(
            Net.OnMessage);
    }

    public static Send(id: string, data: any = null): void {
        let proto: IProto = { ID: id, Data: data || {} };
        Net.Client.Send(JSON.stringify(proto));
    }

    public static OnMessage(event: any): void {
        console.log("receive event:" + event.data);
        let proto: IProto = JSON.parse(event.data);
        Msg.emit(proto.ID, proto.Data);
    }

}