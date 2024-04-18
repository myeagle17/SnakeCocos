import { _decorator, Button} from 'cc';
import { UIBaseForm } from '../../engine/ui/UIBaseForm';
import { UIMgr } from '../../engine/ui/UIMgr';
import { UIFormId } from '../../engine/ui/UIFormId';
import { ModuleBase } from '../../engine/module/ModuleBase';
import EventName from '../const/EventName';
const { ccclass, property } = _decorator;

@ccclass('UIStartForm')
export class UIStartForm extends UIBaseForm {
    @property(Button)
    public BtnStart:Button;
    public OnInit(args: any[]): void { super.OnInit(args); }
    public OnOpen(msg:string): void {
        super.OnOpen(msg);
        this.BtnStart.node.on(Button.EventType.CLICK,()=>{
            UIMgr.ins().OpenUIForm(UIFormId.UIGameForm);
            ModuleBase.DispMessage(EventName.EVENT_ENTER_LEVEL);
        });
    }
}