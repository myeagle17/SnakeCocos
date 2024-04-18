import { Vec3 } from "cc";

/**
 * Msg
 */
export class Msg<T> {

    private static _map: { [key: string]: Function[] } = {};

    public static on (key: string, fun: (data: any) => void): void {
        if (!this._map[key]) {
            this._map[key] = []
        }
        this._map[key].push(fun);
    }

    public static bind (key: string, fun: (data: any) => void, target:any ): void {

        fun = fun.bind(target);

        if (!this._map[key]) {
            this._map[key] = []
        }
        this._map[key].push(fun);
    }


    public static off (key: string, fun: (data: any) => void): void {
        if (fun === null) {
            this._map[key] = []
        } else {
            const index: number = this._map[key].indexOf(fun);
            this._map[key].splice(index, 1);
        }
    }

    public static emit (key: string, data?: any): void {
        const info = this._map[key];
        if (info) {
            info.forEach(item => {
                item(data);
            })
        } else {
            //console.warn('Not register key:' + key);
        }
    }

}
