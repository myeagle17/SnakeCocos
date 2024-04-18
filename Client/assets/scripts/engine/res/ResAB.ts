import { Asset, AssetManager, AudioClip, Prefab, assetManager } from "cc";
import { BaseClass } from "../pattern/BaseClass";
import Debugger from "../debug/Debugger";

export class LoadAssetInfo {
    public loadId: number;
    public abName: string;
    public assetPath: string;
    public assetType: any;
    public loadAssetSuccess: ResABSuc;
    public loadAssetFail: ((userData: any) => void);
    public userData: any;
    public isLoading:boolean;

    public constructor(abName: string, path: string, assetType: any, success: ResABSuc, fail: ((userData: any) => void) | null, userData: any) {
        this.abName = abName;
        this.assetPath = path;
        this.assetType = assetType;
        this.loadAssetSuccess = success;
        this.loadAssetFail = fail;
        this.userData = userData;
        this.isLoading = false;
    }

    public loadAssetBack(error: any, asset: any) {
        if (error) {
            console.log("load Res " + this.assetPath + " error: " + error);
            if (this.loadAssetFail)
                this.loadAssetFail(this.userData);

        }
        else {
            // console.log("load Res " + url + " success!");
            if (this.loadAssetSuccess)
                this.loadAssetSuccess(asset, this.userData,this.assetPath);
        }
        ResAB.ins().removeLoadAssetInfo(this.loadId);
        this.Release();
    }

    public Release() {
        this.loadAssetFail = null;
        this.loadAssetSuccess = null;
        this.userData = null;
    }
}

export interface ResABSuc{
    (asset:any,userData:object,path:string):void
  }

export class ResAB extends BaseClass {
    public static ins(): ResAB {
        return super.ins() as ResAB;
    }
    private static loadId: number = 100000;
    //路径前缀
    private pathPrefix = "assets/deer/assetshotfix/";

    private abBundles: Map<string, AssetManager.Bundle> = new Map<string, AssetManager.Bundle>();
    private loadAssetInfomMap: Map<number, LoadAssetInfo> = new Map<number, LoadAssetInfo>();
    private assetBundleLoading: Array<string> = new Array<string>();

    /**
     * 全路径加载资源，适配unity 配表的资源路径
     * @param path 
     */
    public loadRes(path: string, loadSuccess: ResABSuc, loadFail: ((userData: any) => void) | null, type?: any, userData?: any) {
        if (!path)
            return;
        let lowerPath = path.toLowerCase();
        if (lowerPath.indexOf(this.pathPrefix) > -1) {
            let p = lowerPath.replace(this.pathPrefix, '');
            let firstIdx = p.indexOf('/');
            let abName = p.substring(0, firstIdx);
            let assetPath = p.substring(firstIdx+1, p.indexOf('.'));

            let info: LoadAssetInfo = new LoadAssetInfo(abName, assetPath, type, loadSuccess, loadFail, userData);
            info.loadId = ResAB.loadId++;
            this.loadAssetInfomMap.set(info.loadId, info);

            this.loadAssetByInfo(info);
        }
    }

    public loadResByAbName(abName: string, assetPath: string, loadSuccess: ((asset: any, userData: any) => void), loadFail: ((userData: any) => void) | null, type?: any, userData?: any) {
        if (!abName || !assetPath)
            return;
        let info: LoadAssetInfo = new LoadAssetInfo(abName.toLowerCase(), assetPath.toLowerCase(), type, loadSuccess, loadFail, userData);
        info.loadId = ResAB.loadId++;
        this.loadAssetInfomMap.set(info.loadId, info);

        this.loadAssetByInfo(info);
    }

    private loadAssetByInfo(loadInfo: LoadAssetInfo) {
        if (!loadInfo) {
            Debugger.LogError("加载资源失败，loadinfo 为空");
            return;
        }
        if (this.abBundles.has(loadInfo.abName)) {
            // let bundle = this.abBundles.get(loadInfo.abName);
            // bundle.load(loadInfo.assetPath, loadInfo.loadAssetBack.bind(loadInfo));
        }
        else {
            this.loadAssetsBundle(loadInfo.abName);
        }
    }

    private loadAssetsBundle(abName: string): void {
        if (this.assetBundleLoading.indexOf(abName) > -1)
            return;
        this.assetBundleLoading.push(abName);
        assetManager.loadBundle(abName, (err, bundle) => {
            if (err !== null) {
                console.log("[ResMgr]:Load AssetsBundle Error: " + abName);
            }
            else {
                console.log("[ResMgr]:Load AssetsBundle Success: " + abName);
                this.abBundles.set(abName, bundle);
                this.currentDelayTime = 0;
                // this.loadAssetInfomMap.forEach(value => {
                //     if (value.abName == abName) {
                //         bundle.load(value.assetPath, value.loadAssetBack.bind(value));
                //     }
                // });
            }
            delete this.assetBundleLoading[abName];
        });
    }

    public removeLoadAssetInfo(loadid: number) {
        if (this.loadAssetInfomMap.has(loadid)) {
            this.loadAssetInfomMap.delete(loadid);
        }
    }

    public releaseAssetBundle(abName: string) {
        if (this.abBundles.has(abName)) {
            this.abBundles.get(abName).releaseAll();
        }
    }

    public releaseAllAseetBundle(){
        this.abBundles.forEach((value , key) =>{
            value.releaseAll();
        });
    }
    /**
     * 获取已经加载过的bundle资源
     * @param abName 
     * @param resUrl 
     * @returns 
     */
    public getAsset(abName: string, resUrl: string): any {
        var bundle = assetManager.getBundle(abName);
        if (bundle === null) {
            console.log("[error]: " + abName + " AssetsBundle not loaded !!!");
            return null;
        }
        return bundle.get(resUrl);
    }
    private DelayTime:number = 0.5;
    private SumPerBatch:number = 10;
    private currentDelayTime:number = 0;
    private currentSumPerBatch:number = 0;
    public update(delta:number):void{
        if(this.currentDelayTime>0){
            this.currentDelayTime -= delta;
            return;
        }
        this.currentSumPerBatch = 0;
        this.loadAssetInfomMap.forEach(value => {
            if(this.currentSumPerBatch>this.SumPerBatch||value.isLoading||(!this.isHasAbundle(value.abName)))return;
            this.currentSumPerBatch++;
            value.isLoading = true;
            this.abBundles.get(value.abName).load(value.assetPath,(error: any, asset: any)=>{
                value.isLoading = false;
                value.loadAssetBack(error,asset);
            });
        });
        if(this.currentSumPerBatch>0){
            this.currentDelayTime=this.DelayTime;
        }
    }

    private isHasAbundle(abName:string):boolean{
        return this.abBundles.has(abName);
    }
}