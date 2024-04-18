import { _decorator, Component, EventKeyboard, input, Input, KeyCode, Node, Vec3 } from 'cc';
import { Actor } from './Actor';
const { ccclass, property } = _decorator;

@ccclass('PlayerActor')
export class PlayerActor extends Actor{
    private tempPos:Vec3 = new Vec3();
    private xSpeed:number = 6.0;
    private dir:number = 1;
    protected onLoad(): void {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    protected update(dt: number): void {
        this.tempPos.set(this.node.position);
        this.tempPos.x += this.xSpeed * this.dir * dt;
        this.node.setPosition(this.tempPos);
    }

    onKeyDown(event: EventKeyboard) 
    {
        if (event.keyCode == KeyCode.KEY_A) {
            this.moveLeft();
        }else if (event.keyCode == KeyCode.KEY_D){
            this.moveRight();
        }
    }

    private moveLeft():void
    {
        this.dir = -1;
    }

    private moveRight():void
    {
        this.dir = 1;
    }
}