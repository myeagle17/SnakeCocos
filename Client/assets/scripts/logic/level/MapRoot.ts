/** @format */
import { _decorator, Camera, Component, EventTouch, Input, instantiate, Node, Prefab, Vec2, Vec3 } from "cc";
import Player from "../Proto/Player";
import { ResAB } from "../../engine/res/ResAB";
import Debugger from "../../engine/debug/Debugger";
import { PlayerEntity } from "./PlayerEntity";
import FrameManager from "./FrameManager";
const { ccclass, property, executeInEditMode } = _decorator;

/**
 * 493786182
 * Thu May 11 2023 18:33:49 GMT+0800 (GMT+08:00)
 */

@ccclass("MapRoot")
export class MapRoot extends Component {
    @property(Node)
    public entityRoot: Node;
    @property(Camera)
    public cameraMain: Camera;
    public PlayerEntities: Map<number, PlayerEntity> = new Map();
    private IsRun: boolean = false;
    private tempVec3: Vec3 = new Vec3();
    private isTouch: boolean = false;
    private waitTime: number = 3;
    protected start(): void {}

    protected update(dt: number): void {
        if (!this.IsRun) return;
        if (this.waitTime <= 0) {
            FrameManager.Instance().Update(dt);
        } else {
            this.waitTime -= dt;
            this.entityRoot.node.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        }
    }

    private onTouchStart(data: EventTouch) {
        this.isTouch = true;
        let a = data.getLocation();
        this.tempVec3.x = a.x;
        this.tempVec3.y = a.y;
        this.tempVec3.z = 0;
        this.entityRoot.inverseTransformPoint(this.tempVec3, this.cameraMain.screenToWorld(this.tempVec3));
        FrameManager.Instance().SetCurFrame(this.tempVec3);
    }

    public StartGame(players: Array<Player>, cb: () => void) {
        let i = 0;
        let self = this;
        self.IsRun = true;
        let loadComplete = function (p: Player, playerNode: Node) {
            let entity: PlayerEntity = playerNode.getComponent(PlayerEntity);
            entity.Init(i, p);
            self.PlayerEntities.set(p.uid, entity);
            playerNode.setParent(self.entityRoot);
            i++;

            if (i == players.length) {
                cb();
            }
        };
        for (let p of players) {
            ResAB.ins().loadResByAbName(
                "prefab",
                `player`,
                (asset, userdata) => {
                    let form = instantiate(asset);
                    loadComplete(p, form);
                },
                (userdta) => {
                    Debugger.LogError("界面加载失败:" + name);
                },
                Prefab
            );
        }
    }
}
