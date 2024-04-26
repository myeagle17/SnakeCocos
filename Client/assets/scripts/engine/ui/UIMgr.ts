/** @format */

import { Camera, Enum, Game, Prefab, director, instantiate, Node } from "cc";
import { BaseClass } from "../pattern/BaseClass";
import { UIBaseForm } from "./UIBaseForm";
import { UILayer } from "./UILayer";
import Debugger from "../debug/Debugger";
import Uiform from "../../logic/data/excel/Uiform";
import { ResAB } from "../res/ResAB";

enum UIFormLayer {
    TouchLayer = "TouchLayer",
    SceneLayer = "SceneLayer",
    BackgroudLayer = "BackgroudLayer",
    NormalLayer = "NormalLayer",
    InfoLayer = "InfoLayer",
    TipLayer = "TipLayer",
    TopLayer = "TopLayer",
}
Enum(UIFormLayer);

export class UIMgr extends BaseClass {
    /** 重载单例*/
    public static ins(): UIMgr {
        return super.ins() as UIMgr;
    }
    private _uiForms: { [name: string]: UIBaseForm } = {};
    private _openingForms: Array<string> = new Array<string>();
    private _layers: { [layer: string]: UILayer } = {};
    public uinode: Node | undefined | null;
    public panelRoot: Node | undefined;
    public uicamera: Camera | undefined;
    private splashNode: Node | undefined;
    public hudNode: Node;
    /**
     * 常驻界面
     */
    private _constView: string[];

    private prefix: string = "assets/deer/assetshotfix/ui/uiforms/";
    public init(uiNode: Node) {
        this.uinode = uiNode;
        director.addPersistRootNode(this.uinode);
        let foreground = this.uinode?.getChildByName("foreground");
        this.hudNode = this.uinode?.getChildByName("hudNode");
        if (this.uinode === undefined || this.uinode == null) {
            throw new Error(`can not find canvas ui root.`);
        }

        this.createrLayer();
        foreground?.setSiblingIndex(7);
        this.uicamera = this.uinode?.getChildByName("Camera")?.getComponent(Camera)!;
        this.splashNode = foreground?.getChildByName("splash");

        this._constView = ["UILoadingForm", "UIWaitForm"];
    }

    private createrLayer() {
        Object.keys(UIFormLayer).forEach((key) => {
            let layer: Node = new Node();
            let uilayer = layer.addComponent(UILayer);
            uilayer.init(key);
            this.uinode.addChild(layer);
            this._layers[key] = uilayer;
        });
    }

    public get InfoLayer(): Node {
        return this._layers[UIFormLayer.InfoLayer].node;
    }

    public OpenUIForm(formId: number, ...args: any[]) {
        let config: Uiform = Uiform.GetData(formId);

        if (!config) {
            Debugger.warn(`界面配置没有ID=${formId}的配置`);
            return;
        }

        this.OpenForm(formId, config.GetName(), config.GetUiGroupName(), args);
    }
    private OpenForm(formId: number, formName: string, layer: string, args: any[]) {
        if (this._openingForms.indexOf(formName) > -1) return;
        if (!this._uiForms[formName]) {
            this._openingForms.push(formName);
            this.load(formName, (form) => {
                this._openingForms.splice(this._openingForms.indexOf(formName), 1);

                if (!form) {
                    Debugger.LogError(`界面打开失败：${formName}`);
                    return;
                }
                let baseForm: UIBaseForm = form.getComponent(UIBaseForm);
                this._layers[layer].node.addChild(baseForm.node);
                baseForm.FormId = formId;
                baseForm.OnInit.apply(baseForm, args);
                baseForm.OnOpen.apply(baseForm, args);
                this._uiForms[formName] = baseForm;
            });
        } else {
            let baseForm = this._uiForms[formName];
            baseForm.FormId = formId;
            baseForm.OnOpen.apply(baseForm, args);
            this._layers[layer].node.addChild(baseForm.node);
        }
    }

    public HasUIForm(formId: number): boolean {
        let config: Uiform = Uiform.GetData(formId);

        if (!config) {
            Debugger.warn(`界面配置没有ID=${formId}的配置`);
            return false;
        }
        return this._uiForms[config.GetName()] != null;
    }

    public addToSceneLayer(node: Node) {
        this._layers[UIFormLayer.SceneLayer].node.addChild(node);
    }

    public load(name: string, loadComplete: (view) => void) {
        if (!name) {
            loadComplete(null);
            Debugger.warn("加载界面资源名称为空");
            return;
        }

        ResAB.ins().loadResByAbName(
            "ui",
            `uiforms/${name}`,
            (asset, userdata) => {
                let form = instantiate(asset);
                loadComplete(form);
            },
            (userdta) => {
                Debugger.LogError("界面加载失败:" + name);
            },
            Prefab
        );
    }

    public updateUIForm(deltaTime: number) {
        for (let key in this._uiForms) {
            this._uiForms[key].OnUpdate(deltaTime);
        }
    }

    public CloseUIForm(val: number | UIBaseForm) {
        let formId: number = -1;
        if (typeof val == "number") {
            formId = val as number;
        } else {
            formId = (val as UIBaseForm).FormId;
        }
        let config: Uiform = Uiform.GetData(formId);

        if (config == null) {
            Debugger.warn(`界面配置没有ID=${formId}的配置`);
            return;
        }
        this.closeForm(config.GetName(), config.GetUiGroupName());
    }

    // public closeUIFromByForm(baseForm:UIBaseForm){
    //     this.closeUIForm(baseForm.FormId);
    // }

    public GetInstanceRoot(): Node {
        return this.uinode;
    }

    private closeForm(formName: string, layer: string) {
        if (!this._uiForms[formName]) {
            Debugger.warn(`关闭无效界面：${formName}`);
            return;
        }
        let form = this._uiForms[formName];
        form.OnClose();
        this._layers[layer].node.removeChild(form.node);
        if (this._constView.indexOf(formName) == -1) {
            this.disposeForm(formName);
        }
    }

    private disposeForm(formName: string) {
        if (null != this._uiForms[formName]) {
            this._uiForms[formName].node.destroy();
        }
        delete this._uiForms[formName];
    }

    public showSplash() {
        this.splashNode!.active = true;
    }

    public hideSplash() {
        this.splashNode!.active = false;
    }
}
