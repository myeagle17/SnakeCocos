import { _decorator, Label } from 'cc';
import { UIBaseForm } from '../../engine/ui/UIBaseForm';
const { ccclass, property } = _decorator;

@ccclass('UITipsForm')
export class UITipsForm extends UIBaseForm {
    @property(Label)
    public LabTips: Label;
    public OnInit(args: any[]): void { super.OnInit(args); }
    public OnOpen(msg: string): void {
        super.OnOpen(msg);
        this.LabTips.string = msg;
    }
}