/** @format */
import { _decorator, Color, Component, instantiate, Label, math, Node, Prefab, Sprite, Vec3 } from "cc";
import Player from "../Proto/Player";
import { ResAB } from "../../engine/res/ResAB";
import Debugger from "../../engine/debug/Debugger";
import { FrameInfo } from "../Proto/Proto";
const { ccclass, property, executeInEditMode } = _decorator;

/**
 * 493786182
 * Thu May 11 2023 18:33:49 GMT+0800 (GMT+08:00)
 */

@ccclass("PlayerEntity")
export class PlayerEntity extends Component {
    @property(Label)
    public labName: Label;
    @property(Sprite)
    public spr: Sprite;
    public Colors: Array<Color> = [Color.RED, Color.BLUE, Color.CYAN, Color.GREEN, Color.YELLOW];
    public uid: number;
    private speed = 1.0;

    Init(i: number, p: Player) {
        this.uid = p.uid;
        this.labName.text = ""; // p.name;
        let posX = i * 100;
        this.node.setPosition(new Vec3(posX, 0, 0));
        this.spr.color = this.Colors[i];
    }

    DoFrame(frameInfo: FrameInfo) {
        if (frameInfo.isHasOperation) {
            this.RotateToPos(frameInfo.touchX, frameInfo.touchY);
        }
        let pos = this.node.position.clone();
        pos.x += this.speed * this.xRot;
        pos.y += this.speed * this.yRot;
        this.node.position=pos;
    }

    private xRot = 0;
    private yRot = 0;

    RotateToPos(x, y) {
        let pos = this.node.position;
        let dis = Math.sqrt((x - pos.x)*(x - pos.x) + (y - pos.y) *(y - pos.y));
        if (dis <= 0.1) return;
        this.xRot = (x - pos.x) / dis;
        this.yRot = (y - pos.y) / dis;
    }
}
