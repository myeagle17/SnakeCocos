import { _decorator, Component,Node } from 'cc';
import { MsgGroup } from '../msg/MsgGroup';
import { ComponentEx } from './ComponentEx';
import { UIMgr } from './UIMgr';
const { ccclass, property ,executeInEditMode} = _decorator;

/**
 * 493786182
 * Thu May 11 2023 18:33:49 GMT+0800 (GMT+08:00)
 */

@ccclass('UIBaseForm')
export class UIBaseForm extends ComponentEx{
    public FormId:number = -1;
    public OnInit(...args: any[]) {
    }

    public OnOpen(...args: any[]) {
        this.OnAddEventListener();
    }

    public OnClose(isShutdown:boolean=false, userData:object=null) {
        this.RemoveAllEvent();
    }
    protected update(dt: number): void {
        this.OnUpdate(dt);
        this.Update();
    }
    public OnUpdate(deltaTime: number,othertime:number = null) {

    }

    public Update(){}//只是为了适配unity的方法

    protected Close()
    {
        UIMgr.ins().CloseUIForm(this);
    }

    protected OnAddEventListener():void{

    }

    protected AddEvent(eventId: string, fun: (data: any) => void) {
        this.RegisterEvent(eventId,fun);
    }

    protected onDestroy(): void {

    }
}