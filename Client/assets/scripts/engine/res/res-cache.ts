
import { _decorator, JsonAsset, Prefab, TextAsset, SpriteFrame, AudioClip, v3, Vec3 } from 'cc';
import { Singleton } from '../pattern/singleton';
import { Res } from './res';
import { Msg } from '../msg/msg';
import { loadTextures } from './res-texture';
const { ccclass, property } = _decorator;

@ccclass('ResCache')
export class ResCache {
    private static _instance: ResCache = null;
    public static get Instance() {
        if (!this._instance) {
            this._instance = new ResCache();
        }
        return this._instance;
    }
    private _json: { [name: string]: JsonAsset } = {};
    private _prefab: { [name: string]: Prefab } = {};
    private _txt: { [name: string]: TextAsset } = {};
    private _sprite: { [name: string]: SpriteFrame } = {};
    private _sound: { [name: string]: AudioClip } = {};
    private _callback: Function | undefined;


    public async load (callback: Function) {

        this._callback = callback;

        Msg.on('msg_check_res_cache_end', this.checkEnd.bind(this));

        Res.loadJson('data/data-res-cache', async (err, asset) => {
            if (err) {
                console.error('Load cache res error:', err);
                return;
            }

            if (!asset || !asset.json) {
                console.error('resource cache data is null', asset)
                return;
            }

            const jsonPrefab = asset.json['prefab'];
            if (jsonPrefab) ResCache.Instance.loadPrefab(jsonPrefab);
            ResCache.Instance.loadJson(asset.json['json']);
            ResCache.Instance.loadSprite(asset.json['sprite']);
            ResCache.Instance.loadSound(asset.json['sound']);
        });
    }

    public addLoad () {
        //console.log('add load count:', this.msg?.count, 'wait count:', this.msg?.wait_count,);
    }

    public removeLoad () {
        
        //console.log('remove load wait count:', this.msg?.wait_count, ' count:', this.msg?.count);
    }

    public getJson (name: string) {
        const ret = this._json[name];
        if (ret) {
            return ret;
        } else {
            console.error('Res cache not find json res:', name);
            return null;
        }
    }

    public getPrefab (name: string) {
        const ret = this._prefab[name];
        if (ret) {
            return ret;
        } else {
            console.error('Res cache not find prefab res:', name);
            return undefined;
        }
    }

    public getTxt (name: string) {
        const ret = this._txt[name];
        if (ret) {
            return ret;
        } else {
            console.error('Res cache not find text res:', name);
        }
    }

    public getSprite (name: string) {
        const ret = this._sprite[name];
        if (ret !== undefined) {
            return ret;
        } else {
            console.error('Res cache not find sprite res:', name);
        }
    }

    public getSound (name: string) {
        const ret = this._sound[name];
        if (ret !== undefined) {
            return ret;
        } else {
            console.error('Res cache not find sound res:', name);
        }
    }

    public setJson (asset: any[]) {
        asset.forEach(element => {
            this._json[element.name] = element;
        });
    }

    public preloadFxShader (prefab: Prefab) {

        // if (prefab.name.includes('fx_')) {
        //     const preload = Res.inst(prefab, undefined, Vec3.ZERO);
        //     preload.addComponent(FxAutoRemove);
        // }

    }

    public setPrefab (asset: any[]) {
        asset.forEach(element => {
            //this.preloadFxShader(element);
            this._prefab[element.name] = element;
        });
    }

    public setText (asset: any[]) {
        asset.forEach(element => {
            this._txt[element.name] = element;
        });
    }

    public setSprite (asset: any[]) {
        asset.forEach(element => {
            this._sprite[element.name] = element;
        });
    }

    public setSound (asset: any[]) {
        asset.forEach(element => {
            this._sound[element.name] = element;
        });
    }

    public loadJson (paths: string[]) {
        paths.forEach(element => {
            this.addLoad();
            Res.loadDirJson(element, (err, asset) => {
                if (asset) {
                    ResCache.Instance.setJson(asset);
                    this.removeLoad();
                }
            });
        });
    }

    public loadPrefab (paths: string[]) {
        paths.forEach(element => {
            this.addLoad();
            Res.loadDirPrefab(element, (err, asset) => {
                if (asset) {
                    ResCache.Instance.setPrefab(asset);
                    this.removeLoad();
                }
            });
        });
    }

    public loadText (paths: string[]) {
        paths.forEach(element => {
            this.addLoad();
            Res.loadDirText(element, (err, asset) => {
                if (asset) {
                    ResCache.Instance.setText(asset);
                    this.removeLoad();
                }
            })
        });
    }

    public loadSprite (paths: string[]) {
        paths.forEach(element => {
            this.addLoad();
            Res.loadDirSprite(element, (err, asset) => {
                if (asset) {
                    ResCache.Instance.setSprite(asset);
                    this.removeLoad();
                }
            })
        });
    }

    public loadSound (paths: string[]) {
        paths.forEach(element => {
            this.addLoad();
            Res.loadDirSound(element, (err, asset) => {
                if (asset) {
                    ResCache.Instance.setSprite(asset);
                    this.removeLoad();
                }
            })
        });
    }

    public checkEnd (): void {
        if (this._callback) {
            if (Res.count <= 0) {
                this._callback();
                this._callback = undefined;
            }
        }
    }

}
