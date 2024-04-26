/** @format */

import { _decorator, Label, math } from "cc";
import { UIBaseForm } from "../../engine/ui/UIBaseForm";
import EventName from "../const/EventName";
const { ccclass, property } = _decorator;

@ccclass("UIGameForm")
export class UIGameForm extends UIBaseForm {
    @property(Label)
    public LabScore: Label;
    @property(Label)
    public LabTime: Label;

    public OnInit(args: any[]): void {
        super.OnInit(args);
    }
    public OnOpen(msg): void {
        super.OnOpen(msg);
        this.setScore(0);
        this.setTime(0);
    }

    public setScore(score: number): void {
        this.LabScore.text = Math.floor(score).toString();
    }

    public setTime(sec: number): void {
        this.LabTime.text = sec.toString();
    }
}
