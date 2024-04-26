/** @format */

import { WebSocket } from "ws";
import EventMgr from "../EventMgr";
import { IProto, C2SLogin, S2CLoginProto, C2SGameReady, S2CBroadLoginState, LoginState, ProtoBase, FrameInfo, S2CFrameInfoBroad } from "../Proto/Proto";
import PlayerManager from "./PlayerManager";
import NetSend from "../net/NetSend";
import { C2S, S2C } from "../Proto/NetEvent";
import FrameInfoManager from "./FrameInfoManager";
import Player from '../Proto/Player';

export default class ModulePlayer {
    public Init(): void {
        PlayerManager.Instance();
        EventMgr.On(C2S.LOGIN, this.OnLogin, this);
        EventMgr.On(C2S.GAME_READY, this.OnGameReady, this);
        EventMgr.On(C2S.FRAME_INFO, this.OnFrameInfo, this);
        setInterval(() => {
            this.Update();    
        }, 1/30);
    }
    private serverIndex = -1;
    private Update(){
        let index = FrameInfoManager.Instance().GetMinIndex();
        let frameMap = FrameInfoManager.Instance().GetFrameInfo(index);
        if(null == frameMap)return;
        let players = PlayerManager.Instance().Players;
        let isWhole = true;
        for(let p of players){
            if(!frameMap.has(p.uid)){
                isWhole = false;
            }
        }
        if(!isWhole)return;
        FrameInfoManager.Instance().Remove(index);
        let frames = Array.from(frameMap.values());
        if(this.serverIndex ==-1){
            this.serverIndex = frames[0].step;
        }else{
            this.serverIndex++;
        }
        let proto:S2CFrameInfoBroad = {serverStep:this.serverIndex,frames:frames};
        let data = { ID: S2C.FRAME_INFO, Data: proto };
        let msg = JSON.stringify(data);
        for (const player of PlayerManager.Instance().Players) {
            let ws = PlayerManager.Instance().GetWsByPlayer(player);
            if (null != ws) {
                ws.send(msg);
            }
        }
    }

    public clear(): void {}

    public OnLogin(data: C2SLogin, ws: WebSocket): void {
        console.log("login:" + data.name);
        let p = PlayerManager.Instance().AddPlayer(data.name, ws);
        let loginProto: S2CLoginProto = {
            ret: true,
            sender: p.uid,
            uid: p.uid,
            name: p.name,
        };
        NetSend.SendByWs(ws, C2S.LOGIN, loginProto);
        // broadcast
        this.SendBroadLoginState();
    }

    public OnGameReady(data: C2SGameReady, ws: WebSocket): void {
        let p = PlayerManager.Instance().GetPlayer(data.uid);
        let isSuccess = null != p;
        let proto: ProtoBase = { ret: isSuccess, sender: data.uid };
        NetSend.SendByWs(ws, S2C.GAME_READY, proto);
        if (null == p) {
            console.error("can't find player");
            return;
        }
        p.isReady = true;
        this.SendBroadLoginState();
    }

    public OnFrameInfo(data: FrameInfo, ws: WebSocket): void {
        FrameInfoManager.Instance().AddFrameInfo(data);
    }

    public SendBroadLoginState(): S2CBroadLoginState {
        let sumOfReady = 0;
        for (const player of PlayerManager.Instance().Players) {
            if (player.isReady) {
                sumOfReady++;
            }
        }

        let singleProto: S2CBroadLoginState = { players: PlayerManager.Instance().Players, state: this.IsStartGame(sumOfReady) ? LoginState.START : LoginState.WAIT };
        let proto: IProto = { ID: S2C.BROAD_LOGIN_STATE, Data: singleProto };
        let msg = JSON.stringify(proto);
        for (const player of PlayerManager.Instance().Players) {
            let ws = PlayerManager.Instance().GetWsByPlayer(player);
            if (null != ws) {
                ws.send(msg);
            }
        }
        return singleProto;
    }

    private IsStartGame(sumOfReady: number): boolean {
        return sumOfReady >= 2 && sumOfReady == PlayerManager.Instance().Players.length;
    }
}
