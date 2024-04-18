import { ModuleBase } from "../../../engine/module/ModuleBase";
import { processorbase } from "../../../engine/module/ProcessorBase";
import NetEvent from "../../Proto/NetEvent";

export class LoginModule extends ModuleBase {
    public InitProcessor(): void {
        super.InitProcessor()
        // 
        this.AddProcessor("login", new Processor_login(this));
    }
}


class Processor_login extends processorbase {
    protected OnAwake() {
        super.OnAwake();
    }
    public Register(): void {
        super.Register();
        this.RegistEvent(NetEvent.S2C_LOGIN, this.OnEnterLevel);
    }

    private OnEnterLevel(ev: string, obj: any): void {
        console.log("login success:" + obj);
    }
}