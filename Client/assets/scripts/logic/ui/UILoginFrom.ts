/** @format */

import { _decorator, Component, Label, Button, Node, EditBox } from "cc";
import { UIBaseForm } from "../../engine/ui/UIBaseForm";
import Net from "../../engine/net/Net";
import { C2S } from "../Proto/NetEvent";
import { C2SGameReady, C2SLogin, LoginState, ProtoBase, S2CBroadLoginState } from "../Proto/Proto";
import EventName from "../const/EventName";
import GameData from "../global/GameData";
import Player from "../Proto/Player";
const { ccclass, property } = _decorator;

@ccclass("UILoginFrom")
export class UILoginFrom extends UIBaseForm {
    @property(Label)
    public LabInfo: Label;
    @property(Label)
    public LabBtn: Label;

    @property(Button)
    public BtnStart: Button;
    @property(EditBox)
    public InputBox: EditBox;

    OnAddEventListener(): void {
        this.AddEvent(EventName.EVENT_LOGIN_RESULT, (isSuc) => {
            this.LabBtn.text = "START";
        });
        this.AddEvent(EventName.EVENT_UPDATE_PLAYERS_INFO, (data: S2CBroadLoginState) => {
            let players: Array<Player> = data.players;
            let sumOfReady = 0;
            for (let p of players) {
                if (p.isReady) {
                    sumOfReady++;
                }
            }
            this.ShowInfo(sumOfReady, players.length);
            if (data.state == LoginState.START) {
                this.InputBox.node.SetActive(false);
            }
        });
    }
    start() {}

    public OnInit(args: any[]): void {
        super.OnInit(args);
        this.BtnStart.node.on("click", this.OnBtnStart, this);
    }
    public OnOpen(msg: string): void {
        super.OnOpen(msg);
        this.ShowInfo(0, 0);
    }

    private ShowInfo(sumOfReady: number, sumOfAll: number): void {
        this.LabInfo.text = `ready?${sumOfReady}/${sumOfAll}`;
    }

    private OnBtnStart(): void {
        console.log("btn start");
        if (this.LabBtn.text == "START") {
            let data: C2SGameReady = {
                uid: GameData.UID,
            };
            this.BtnStart.node.active = false;
            Net.Send(C2S.GAME_READY, data);
        } else {
            let data: C2SLogin = {
                name: this.InputBox.textLabel.string,
            };
            Net.Send(C2S.LOGIN, data);
        }
    }
}
