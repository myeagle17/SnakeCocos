import { Fsm } from "../../../engine/fsm/Fsm";
import { processorbase } from "../../../engine/module/ProcessorBase";
import EventName from "../../const/EventName";
import GameData from "../../global/GameData";
import GameMap from "./GameMap";
import { LevelStateEnd } from "./LevelStateEnd";
import { LevelStateReady } from "./LevelStateReady";
import { LevelStateRun } from "./LevelStateRun";


export class Processor_level extends processorbase {
    private gameMap: GameMap;
    private fsm: Fsm;
    public static LEVEL_SATE_READY = "LEVEL_SATE_READY";
    public static LEVEL_SATE_RUN = "LEVEL_SATE_RUN";
    public static LEVEL_SATE_END = "LEVEL_SATE_END";

    protected OnAwake() {
        super.OnAwake();
        this.gameMap = new GameMap();
        this.fsm = new Fsm();
        this.fsm.Regist(new LevelStateReady);
        this.fsm.Regist(new LevelStateRun);
        this.fsm.Regist(new LevelStateEnd);
    }
    public Register(): void {
        super.Register();
        this.RegistEvent(EventName.EVENT_ENTER_LEVEL, this.OnEnterLevel);
    }

    protected OnUpdate(elp: any): void {
        this.fsm.Update(elp);
    }

    private OnEnterLevel(ev: string, obj: any): void {
        // 初始化数据
        GameData.Reset();
        // 初始化地图
        this.gameMap.EnterLevel();
        // 初始化主角
        this.fsm.ChangeState(Processor_level.LEVEL_SATE_READY);
        this.fsm.ChangeState(Processor_level.LEVEL_SATE_RUN);
        // 初始化敌人
    }
}