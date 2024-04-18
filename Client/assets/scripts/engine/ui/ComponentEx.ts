import { _decorator, Component,Node } from 'cc';
import { MsgGroup } from '../msg/MsgGroup';
const { ccclass, property ,executeInEditMode} = _decorator;

/**
 * 493786182
 * Thu May 11 2023 18:33:49 GMT+0800 (GMT+08:00)
 */

@ccclass('ComponentEx')
export class ComponentEx extends Component{
    private m_msgGroup:MsgGroup;

    protected RegisterEvent(eventId: string, fun: (data: any) => void) {
        if(null == this.m_msgGroup){
            this.m_msgGroup = new MsgGroup();
        }
        this.m_msgGroup.AddEvent(eventId,fun.bind(this),this);
    }

    protected RemoveAllEvent(){
        this.m_msgGroup?.RemoveAllEvent();
    }

    protected Invoke(methodName:string,delayTime:number):void{
        let cb = this[methodName];
        if(null == cb){
            throw new Error('can not find method:' + methodName);
            return;
        }
        if(delayTime<=0){
            cb.apply(this);
        }else{
            this.scheduleOnce(cb,delayTime);
        }
    }
}