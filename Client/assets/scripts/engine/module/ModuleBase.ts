

import Dictionary from "../util/Dictionary";
import { ActionOne } from "../util/functionDef";
import { processorbase } from "./ProcessorBase";

export class ModuleBase {

    public InitProcessor() {

    }

    protected OnStart() {

    }
    init = false;
    private tupdate(elp) {
        if (!this.init) {
            this.init = true;
            this.OnStart();
        }
        for (let j = 0; j < this.processlist.length; j++) {
            this.processlist[j]._Update(elp);
        }
    }
    private static map = new Array<ModuleBase>();
    public static update(elp) {
        for (let i = 0; i < this.map.length; i++) {
            let mg: ModuleBase = this.map[i];
            mg.tupdate(elp);
        }
    }
    getMgr(key) {
        let ret = null;
        for (let i = 0; i < ModuleBase.map.length; i++) {
            if (ModuleBase.map[i].key == key) {
                ret = ModuleBase.map[i];
                break;
            }
        }
        return ret;
    }
    key: string;
    constructor(key) {
        if (this.getMgr(key)) {
            console.error("已经有一个" + key);
            return;
        }

        this.key = key;
        ModuleBase.map.push(this);
        this.Init();
    }
    processlist = new Array<processorbase>();
    /**
     * 初始化
     */
    protected Init() {
        this.InitProcessor();
        console.log(this.key + "初始化完成");
    }
    eventlist = new Dictionary();

    static DispMessage(msg, obj?) {
        let ret = null;
        for (let i = 0; i < ModuleBase.map.length; i++) {
            var mgr = ModuleBase.map[i];
            ret = mgr.ProcMsg(msg, obj);
            if (ret != null) {
                break;
            }
        }
        return ret;
    }
    ProcMsg(msg: any, obj: any): any {
        let ret = null;
        for (let j = 0; j < this.processlist.length; j++) {
            if (this.processlist[j].HasEvent(msg)) {
                ret = this.processlist[j].pProcEvent(msg, obj);
                if (ret == null) {
                    ret = this.processlist[j].ProcEvent(msg, obj);
                }
                if (null != ret) break;
            }
        }
        return ret;
    }

    protected AddProcessor(key: string, pro: processorbase) {
        pro.key = key;
        this.processlist.push(pro);
    }
    static evl: Dictionary<string, Array<ActionOne<any>>> = new Dictionary<string, Array<ActionOne<any>>>;
    public static RegistEvent(key: string, value: ActionOne<any>, thisObj: any): void {
        if (!ModuleBase.evl.ContainsKey(key)) {
            ModuleBase.evl.push(key, new Array<ActionOne<any>>());

        }
        ModuleBase.evl.TryGetValue(key).push(value.bind(thisObj));

    }
    public static ExtureEvent(key: string, obj: any): any {
        if (ModuleBase.evl.ContainsKey(key)) {
            let x/* let */ = ModuleBase.evl[key]
            for (let i: number = 0; i < x.length; i++) {
                x[i](obj);

            }
        }
        // 未处理代码
        return null;

    }
    public static UnRegistEvent(key: string, cbtalklist: ActionOne<any>): void {
        if (ModuleBase.evl.ContainsKey(key)) {
            let x/* let */ = ModuleBase.evl[key]
            x.Remove(cbtalklist);

        }
    }
}
