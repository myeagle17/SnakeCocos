import { AFsmState } from "../../../engine/fsm/Fsm";
import { Msg } from "../../../engine/msg/msg";
import EventName from "../../const/EventName";
import GameData from "../../global/GameData";
import { Processor_level } from "./Processor_level";

export class LevelStateReady extends AFsmState{

    public constructor(){
        super(Processor_level.LEVEL_SATE_READY);
    }
    public OnEnter(): void {
        Msg.emit(EventName.EVENT_SET_SCORE,0);
        Msg.emit(EventName.EVENT_SET_TIME,GameData.LeftTimeSec);
    }
    public OnUpdate(delta: number): void {
        
    }
    public OnExit(): void {

    }

}
