/** @format */

import { Msg } from "../../engine/msg/msg";
import { S2C } from "../Proto/NetEvent";
import { LoginState, S2CBroadLoginState, S2CFrameInfoBroad, S2CLoginProto } from "../Proto/Proto";
import EventName from "../const/EventName";
import GameData from "../global/GameData";
import FrameManager from "../level/FrameManager";
import LevelCtr from "../level/LevelCtr";
import ModuleManager from "../manager/ModuleManager";

export default class GlobalNetHandler {
    public Register(): void {
        Msg.bind(S2C.LOGIN, this.OnLogin, this);
        Msg.bind(S2C.GAME_READY, this.OnGameReady, this);
        Msg.bind(S2C.BROAD_LOGIN_STATE, this.OnBroadLoginState, this);
        Msg.bind(S2C.FRAME_INFO, this.OnFrameInfo, this);
    }

    private OnLogin(obj: S2CLoginProto): void {
        let playerModule = ModuleManager.Instance().Player;
        if (obj.ret) {
            GameData.UID = obj.uid;
            playerModule.AddPlayer(obj.uid, obj.name, false);
        }
        Msg.emit(EventName.EVENT_LOGIN_RESULT, obj.ret);
    }

    private OnGameReady(obj: any): void {
        console.log("login OnGameReady:" + obj);
    }

    private OnBroadLoginState(data: S2CBroadLoginState): void {
        console.log("OnBroadLoginState" + data);
        let levelStart = data.state == LoginState.START;
        ModuleManager.Instance().Player.UpdatePlayers(data.players);
        Msg.emit(EventName.EVENT_UPDATE_PLAYERS_INFO, data);
        if (levelStart) {
            LevelCtr.Instance().Start();
        }
    }

    private OnFrameInfo(data: S2CFrameInfoBroad): void {
        FrameManager.Instance().AddSeverFrameInfos(data);
    }
}
