import { AFsmState } from "../../../engine/fsm/Fsm";
import { Msg } from "../../../engine/msg/msg";
import EventName from "../../const/EventName";
import GameData from "../../global/GameData";
import { Processor_level } from "./Processor_level";



export class LevelStateRun extends AFsmState{
    public constructor(){
        super(Processor_level.LEVEL_SATE_RUN);
    }
    public OnEnter(): void {
        
    }

    public OnUpdate(delta: number): void {

    }

    public OnExit(): void {

    }
}

