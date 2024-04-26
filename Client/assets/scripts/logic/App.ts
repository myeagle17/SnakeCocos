/** @format */

import { _decorator, Node } from "cc";
import { Game } from "../engine/Game";
import ExcelConfig from "./data/excel/ExcelConfig";
import { UIMgr } from "../engine/ui/UIMgr";
import { UIFormId } from "../engine/ui/UIFormId";
import Net from "../engine/net/Net";
import EventName from "./const/EventName";
import { Msg } from "../engine/msg/msg";
import ModuleManager from "./manager/ModuleManager";
import NetManager from "./manager/NetManager";
import LevelCtr from "./level/LevelCtr";
const { ccclass, property } = _decorator;

@ccclass("App")
export class App extends Game {
    @property(Node)
    public mapNode: Node;
    protected onLoad(): void {
        super.onLoad();
        this.runGame();
    }
    public runGame(): void {
        Net.Init("ws:127.0.0.1:8110");
        super.runGame();
        Net.Connect();
        Msg.on(EventName.EVENT_CLIENT_CONNECT, () => {
            Msg.off(EventName.EVENT_CLIENT_CONNECT, null);

            ExcelConfig.LoadAll(() => {
                this.InitManager();
                UIMgr.ins().OpenUIForm(UIFormId.UILoginForm, "hello world");
            });
        });
    }

    private InitManager(): void {
        NetManager.Instance().Init();
        ModuleManager.Instance().Init();
        LevelCtr.Instance().Init(this.mapNode);
    }
}
