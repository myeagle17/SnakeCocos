import Dictionary from "../util/Dictionary";
import { ModuleBase } from "./ModuleBase";
export type processorCB = (ev,obj)=>any;
export abstract class processorbase {
	public key:string;
    protected OnAwake() {

    }
    protected OnUpdate(elp): void {

    }
    protected OnStart() {

    }
    framecount = 0;
    _Update(elp: any) {
        this.framecount++;
        if (this.framecount == 1) {
            this.OnAwake();
            this.Register();
        }
        else if (this.framecount == 2) {
            this.OnStart();
        }
        else {
            this.OnUpdate(elp);
        }
    }
    mgr;
    constructor(mgr: ModuleBase) {
        this.mgr = mgr;
    }

    eventlist = new Dictionary<any,processorCB>();
    protected Register(){}
    RegistEvent(msg, cb:processorCB = null) {
        if(null == cb){
            console.warn("cb is null");
        }
        if(this.eventlist.ContainsKey(msg)){
            console.warn(`重复注册:${msg}`);    
        }
        this.eventlist.push(msg,cb);
    }
    HasEvent(msg) {
        return this.eventlist.ContainsKey(msg);// Object.prototype.hasOwnProperty.call(this.eventlist, msg);
    }
    ProcEvent(ev, obj) {
        return null;
    }

    pProcEvent(ev, obj){
        const fun:processorCB = this.eventlist.TryGetValue(ev);
        if(null != fun) {
            return fun(ev,obj);
        }
        return null;
    }
}