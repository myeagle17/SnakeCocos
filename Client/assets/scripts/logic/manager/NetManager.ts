/** @format */

import GlobalNetHandler from "../netHandler/GlobalNetHandler";

export default class NetManager {
    private static _ince: NetManager = null;
    public static Instance(): NetManager {
        return (NetManager._ince = NetManager._ince || new NetManager());
    }
    private constructor() {}

    public Init(): void {
        new GlobalNetHandler().Register();
    }
}
