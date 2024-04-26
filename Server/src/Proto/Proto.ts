/** @format */

import Player from "./Player";

export enum LoginState {
    WAIT = 0,
    START = 1,
}
export interface IProto {
    ID: string;
    Data: any;
}

export interface ProtoBase {
    ret: boolean;
    sender: number;
}

export interface C2SLogin {
    name: string;
}

export interface C2SGameReady {
    uid: number;
}

export interface S2CLoginProto extends ProtoBase {
    uid: number;
    name: string;
}

export interface S2CBroadLoginState {
    players: Array<Player>;
    state: LoginState;
}

export interface FrameInfo {
    uid: number;
    step: number;
    isHasOperation: boolean;
    touchX: number;
    touchY: number;
    touchZ: number;
}

export interface S2CFrameInfoBroad {
    serverStep: number;
    frames: Array<FrameInfo>;
}
