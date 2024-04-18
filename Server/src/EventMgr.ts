import EventEmitter from 'events'

export default class EventMgr {
    public static net: EventEmitter = new EventEmitter();

    public static On(msg: string, func: any, target = null): void {
        target == null ? EventMgr.net.on(msg, func) : EventMgr.net.on(msg, func.bind(target));
    }

    public static Off(msg: string, func: any): void {
        EventMgr.net.off(msg, func);
    }

    public static Emit(msg: string, ...args: any): void {
        EventMgr.net.emit(msg, ...args);
    }
}