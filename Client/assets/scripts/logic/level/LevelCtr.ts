/** @format */

import { Node } from "cc";
import { MapRoot } from "./MapRoot";
import ModuleManager from "../manager/ModuleManager";

export default class LevelCtr {
    private static _ince: LevelCtr = null;

    public mapRoot: MapRoot;

    public static Instance(): LevelCtr {
        return (LevelCtr._ince = LevelCtr._ince || new LevelCtr());
    }
    public Init(mapRoot: Node): void {
        this.mapRoot = mapRoot.getComponent(MapRoot);
    }

    public Start(): void {
        let playerModule = ModuleManager.Instance().Player;
        let players = [];
        playerModule.Players.forEach((val, key) => players.push(val));
        this.mapRoot.StartGame(players, () => {
            console.log("Init End");
        });
    }
}
