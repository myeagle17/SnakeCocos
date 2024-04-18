import { _decorator, Node, Component } from 'cc';
import { UIMgr } from './ui/UIMgr';
import { ResAB } from './res/ResAB';
import { ModuleBase } from './module/ModuleBase';


const { ccclass ,property} = _decorator;

@ccclass('Game')
export class Game extends Component {
    private static _ince:Game = null;
    public static ins(): Game {
        return Game._ince;
    }
    @property(Node)
    public initNode: Node;
    @property(Node)
    public uiNode: Node;
    
    protected onLoad(): void {
        Game._ince = this;
    }

    public runGame(){
        UIMgr.ins().init(this.uiNode);
    }

    public update(deltaTime: number){
        ModuleBase.update(deltaTime);
        UIMgr.ins().updateUIForm(deltaTime);
        ResAB.ins().update(deltaTime);
    }
}

