/** @format */

import { ModuleBase } from "../../engine/module/ModuleBase";
import { PlayerModule } from "../module/player/PlayerModule";

export default class ModuleManager {
    private static _ince: ModuleManager = null;
    public static Instance(): ModuleManager {
        return (ModuleManager._ince = ModuleManager._ince || new ModuleManager());
    }
    public Player: PlayerModule;

    private dataMDic: Map<string, ModuleBase> = new Map();
    private constructor() {}

    public Init(): void {
        this.Player = new PlayerModule();
        this.Player.Init();
    }
}
