import { _decorator, Component, Label, Button, Node, EditBox } from 'cc';
import { UIBaseForm } from '../../engine/ui/UIBaseForm';
import Net from '../../engine/net/Net';
import NetEvent from '../Proto/NetEvent';
import { LoginProto } from '../Proto/Proto';
const { ccclass, property } = _decorator;

@ccclass('UILoginFrom')
export class UILoginFrom extends UIBaseForm {
    @property(Label)
    public LabInfo: Label;
    @property(Label)
    public LabBtn: Label;

    @property(Button)
    public BtnStart: Button;
    @property(EditBox)
    public InputBox: EditBox;
    start() {
        this.BtnStart.node.on("click", () => {

        }, this);
    }

    public OnInit(args: any[]): void {
        super.OnInit(args);
        this.BtnStart.node.on("click", () => {
            console.log("btn start");
            let data: LoginProto = {
                name: this.InputBox.textLabel.string
            };
            Net.Send(NetEvent.C2S_LOGIN, data);
        }, this);
    }
    public OnOpen(msg: string): void {
        super.OnOpen(msg);
        this.ShowInfo(0, 0);
    }

    private ShowInfo(sumOfReady: number, sumOfAll: number): void {
        this.LabInfo.text = `ready?${sumOfReady}/${sumOfAll}`
    }


}


