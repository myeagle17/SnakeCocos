import { _decorator } from 'cc';
import { Game } from '../engine/Game';
import ExcelConfig from './data/excel/ExcelConfig';
import { UIMgr } from '../engine/ui/UIMgr';
import { UIFormId } from '../engine/ui/UIFormId';
import { LevelModule } from './module/level/LevelModule';
import Net from '../engine/net/Net';
import EventName from './const/EventName';
import { Msg } from '../engine/msg/msg';
import NetEvent from './Proto/NetEvent';
import { LoginProto } from './Proto/Proto';
import { LoginModule } from './module/Login/LoginModule';
const { ccclass, property } = _decorator;

@ccclass('App')
export class App extends Game {
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
                this.InitModule();
                UIMgr.ins().OpenUIForm(UIFormId.UILoginForm, "hello world");

            })
        })

    }

    private InitModule(): void {
        new LoginModule("login");
        new LevelModule("level");
    }
}