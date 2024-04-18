/** @format */

import { _decorator, Component, Node } from "cc";
import { Msg } from "./msg";
import Dictionary from "../util/Dictionary";
import StringTool from "../util/StringTool";

export class MsgGroup {
    private m_EventDic: Dictionary<string, (data: any) => void> = new Dictionary<string, (data: any) => void>();

    public AddEvent(eventId: string, fun: (data: any) => void , target:object){
        if (this.m_EventDic.ContainsKey(eventId)) {
            console.error(StringTool.Format("重复注册事件 ID={0}", eventId));
            Msg.off(eventId, this.m_EventDic[eventId]);
            this.m_EventDic.Remove(eventId);
        }
        this.m_EventDic.push(eventId, fun);
        if(null == target){
            Msg.on(eventId, fun);
        }else{
            Msg.bind(eventId, fun,target);
        }
    }

    public RemoveAllEvent(){
        let _i = 0;
        for(let _key of this.m_EventDic.GetKeys()){
            Msg.off(_key , this.m_EventDic[_key]);
            _i++;
        }
        if(_i!=this.m_EventDic.count){
            console.error("MsgGroup 删除失败");
        }
        this.m_EventDic.Clear();
    }
}
