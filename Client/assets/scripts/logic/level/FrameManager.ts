/** @format */

import { Vec3 } from "cc";
import { FrameInfo, S2CFrameInfoBroad } from "../Proto/Proto";
import GameData from "../global/GameData";
import Net from "../../engine/net/Net";
import { C2S } from "../Proto/NetEvent";
import LevelCtr from "./LevelCtr";
import { MapRoot } from "./MapRoot";
import { PlayerEntity } from "./PlayerEntity";

export default class FrameManager {
    private frameInterval = 1 / 30;
    private curTime = 0;
    private WaitStep = 150;
    private static _ince: FrameManager = null;
    private frameInfos: Array<S2CFrameInfoBroad> = new Array();
    public static Instance(): FrameManager {
        return (FrameManager._ince = FrameManager._ince || new FrameManager());
    }
    public CurFrame: FrameInfo;
    private constructor() {
        this.CurFrame = {
            uid: GameData.UID,
            step: 0,
            isHasOperation: false,
            touchX: 0,
            touchY: 0,
            touchZ: 0,
        };
        
    }

    public ResetCurFrame() {
        this.CurFrame.isHasOperation = false;
        this.CurFrame.touchX = 0;
        this.CurFrame.touchY =0 ;
        this.CurFrame.touchZ = 0 ;
    }

    public SetCurFrame(pos: Vec3) {
        this.CurFrame.isHasOperation = true;
        this.CurFrame.touchX = pos.x;
        this.CurFrame.touchY = pos.y;
        this.CurFrame.touchZ = pos.z;
    }

    public Update(delta: number) {
        if(this.WaitStep>=0){
            this.WaitStep--;
            return;
        }
        if (this.curTime > 0) {
            this.curTime -= delta;
            return;
        }
        this.curTime = this.frameInterval;
        // 判断是否有触摸，有则发送
        this.CheckAndSendFrameInfo();
        // 判断是否有接受到的frameInfo，有则处理
        if (this.frameInfos.length == 0) return;
        let frameData = this.frameInfos.shift();
        let playerENtitys = LevelCtr.Instance().mapRoot.PlayerEntities;
        for (const frameInfo of frameData.frames) {
            let playerEntity = playerENtitys.get(frameInfo.uid);
            playerEntity.DoFrame(frameInfo);
        }
    }

    public AddSeverFrameInfos(data: S2CFrameInfoBroad) {
        this.frameInfos.push(data);
    }

    private CheckAndSendFrameInfo() {
        this.CurFrame.step++;
        if(this.CurFrame.isHasOperation){
            console.log("do"+JSON.stringify(this.CurFrame))
        }
        Net.Send(C2S.FRAME_INFO, this.CurFrame);
        if (this.CurFrame.isHasOperation) {
            this.ResetCurFrame();
        }
    }
}
