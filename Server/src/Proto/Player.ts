/** @format */

import { WebSocket } from "ws";

export default class Player {
    public uid: number;
    public name: string;
    public isReady: boolean;
    public constructor(uid: number, name: string) {
        this.uid = uid;
        this.name = name;
        this.isReady = false;
    }
}
