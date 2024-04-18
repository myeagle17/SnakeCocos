
export class Singleton {

    private static _instance: any = null;

    public static get Instance() {
        if (!this._instance) {
            this._instance = new this();
            
        }
        return this._instance;
    }

    public init() {}

    public clear() {
        Singleton._instance = null;
    }

}