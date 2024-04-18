export interface IProto {
    ID: string,
    Data: any,
}

export interface ProtoBase {
    ret: boolean,
    sender: number,
}

export interface C2SLogin {
    name: string
}

export interface C2SGameReady {
    uid: number
}




export interface S2CLoginProto extends ProtoBase {
    uid: number,
    name: string,
}

export interface S2CBroadLoginState {
    sumOfReady: number,
    sumOfAll: number,
}

export interface S2CGameStart {

}