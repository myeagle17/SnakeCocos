/** @format */

import { FrameInfo, S2CFrameInfoBroad } from "../Proto/Proto";

export default class FrameInfoManager {

    private static _ince: FrameInfoManager = null;
    public static Instance(): FrameInfoManager {
        return (FrameInfoManager._ince = FrameInfoManager._ince || new FrameInfoManager());
    }

    private frames: Map<number,Map<number,FrameInfo>> = new Map();
    private constructor() {}

    public AddFrameInfo(frameInfo: FrameInfo) {
        console.log("frameInfo.id = " + JSON.stringify(frameInfo));
        let frameInfos = this.frames.get(frameInfo.step);
        if(null == frameInfos){
            console.log("null");
            frameInfos = new Map();
            this.frames.set(frameInfo.step,frameInfos);
        }
        frameInfos.set(frameInfo.uid,frameInfo);
    }

    public GetMinFrameInfo():Map<number,FrameInfo>{
        return this.GetFrameInfo(this.GetMinIndex());
    }

    public GetFrameInfo(index):Map<number,FrameInfo>{
        return this.frames.get(index);
    }

    Remove(index:number) {
        this.frames.delete(index);
    }

    public GetMinIndex():number{
        let result = -1;
        this.frames.forEach((val,key)=>{
            if(result <0){
                result = key;
            }else {
                result = Math.min(result,key);
            }
        })
        return result;
    }
}
