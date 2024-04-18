/** @format */

import { ScrollView,Button, Color, Component, ImageAsset, Label, Layers, MeshRenderer, Node, Sprite, SpriteFrame, Toggle, UITransform, Vec2, Vec3, __private, find, Camera, view, Slider } from "cc";
import { ResAB } from "../scripts/engine/res/ResAB";

Node.prototype.Reset = function () {
    let node: Node = this as Node;
    Vec3.zero(node.position);
    Vec3.zero(node.eulerAngles);
    Vec3.zero(node.scale);
};

Node.prototype.SetLayer = function (layerName: string) {
    let layerIndex = Layers.nameToLayer(layerName);
    (this as Node).layer = 2 ** layerIndex;
};

Node.prototype.getComponentInParent = function<T extends Component>(classConstructor: new (...args: any[]) => T): T | null{
    let parent = (this as Node).getParent();
    return parent?.getComponent(classConstructor);
}

Node.prototype.AddComponent = function<T extends Component>(classConstructor: __private._types_globals__Constructor<T>): T{
    return (this as Node).addComponent(classConstructor);
}

Node.prototype.FindChildEx = function(goName:string):Node{
    let tNode = this as Node;
    let result = tNode.getChildByName(goName);
    if(null != result)return result;
    for(let child of tNode.children){
        result = child.FindChildEx(goName);
        if(null != result)return result;
    }
    return null;
}

Node.prototype.GetOrAddComponent = function<T extends Component>(classConstructor: __private._types_globals__Constructor<T>): T{
    let node:Node = this as Node;
    let result = node.getComponent(classConstructor);
    if(null == result){
        result = node.AddComponent(classConstructor);
    }
    return result;
}

Node.prototype.Find = function(path:string):Node{
    return find(path,this);
}

Object.defineProperty(Node.prototype, "node", {
    get: function () {
        return this;
    },
    enumerable: false,
    configurable: true
});

Object.defineProperty(Node.prototype, "childCount", {
    get: function () {
        return (this as Node).children.length;
    },
    enumerable: false,
    configurable: true
});

Button.prototype.AddListener = function(cb:()=>void,thisObj:any):void{
    if(null == thisObj){
        (this as Button).node.on(Button.EventType.CLICK,cb);
    }else{
        (this as Button).node.on(Button.EventType.CLICK,cb.bind(thisObj));
    }
}

Object.defineProperty(Button.prototype, "m_CanClick", {
    get: function () {
        return (this as Button).enabled;
    },
    set: function (val:boolean) {
        (this as Button).enabled = val;
    },
    enumerable: false,
    configurable: true
});

Object.defineProperty(Label.prototype, "text", {
    get: function () {
        return (this as Label).string;
    },
    set: function (val:string) {
        (this as Label).string = val;
    },
    enumerable: false,
    configurable: true
});


Object.defineProperty(Label.prototype, "preferredWidth", {
    get: function () {
        return 0;//暂时
    },
    enumerable: false,
    configurable: true
});



Object.defineProperty(Label.prototype, "preferredHeight", {
    get: function () {
        let uiTrans:UITransform = (this as Label).getComponent(UITransform);
        if(null == uiTrans){
            console.error("no UITransform in Label")
            return (this as Label).lineHeight;
        }
        (this as Label).updateRenderData();
        return uiTrans.height;
    },
    enumerable: false,
    configurable: true
});

MeshRenderer.prototype.SetColor = function(tag:string ,color:Color):void{
    if(null == (this as MeshRenderer).materials)return;
    for(let m of (this as MeshRenderer).materials){
        m.setProperty(tag , color);
    }
}

Sprite.prototype.SetSprite = function(spriteName:SpriteFrame):void{
    let spr:Sprite = this as Sprite;
    spr.spriteFrame = spriteName;
}

Sprite.prototype.SetSpritePath = function(path:string):void{
    
    let loadSuc = (prefab: ImageAsset) => {
        let sp = this as Sprite;
        sp.spriteFrame = SpriteFrame.createWithImage(prefab);
        sp.enabled = true;
    };
    ResAB.ins().loadRes(path, (asset, userData,url) => {
        loadSuc(asset);
    }, (userData)=>{console.error("获取图片失败：" + path);}, ImageAsset);
}

Sprite.prototype.SetTextureByResources = function(path:string , setNativeSize:boolean = false):void{
    (this as Sprite).SetSpritePath(path);
}

Sprite.prototype.SetSpriteAsync = function(atlas:string,path:string ,cb:(sp:Sprite)=>void):void{
    let loadSuc = (prefab: ImageAsset) => {
        let sp = this as Sprite;
        sp.spriteFrame = SpriteFrame.createWithImage(prefab);
        sp.enabled = true;
        if(null != cb){
            cb(this);
        }
    };
    path =`${atlas.slice(0,atlas.length-5)}/${path}`;
    ResAB.ins().loadRes(path, (asset, userData,url) => {
        loadSuc(asset);
    }, (userData)=>{
        console.error("获取图片失败：" + path);
        if(null != cb){
            cb(null);
        }
    }, ImageAsset);
}

Object.defineProperty(Sprite.prototype, "alpha", {
    get:function(){
        return (this as Sprite).color.a;
    },
    set: function (val:number) {
        let color = (this as Sprite).color.clone();
        color.a = val;
        (this as Sprite).color = color;
    },

    enumerable: false,
    configurable: true
});

Component.prototype.Destroy = function(c:Component):void{
    if(c == null){
        console.error("component is null");
        return;
    }
    c.destroy();
}

Object.defineProperty(UITransform.prototype, "sizeDelta", {
    get:function(){
        return new Vec2((this as UITransform).width,(this as UITransform).height);
    },

    set: function (val:Vec2) {
        (this as UITransform).width = val.x;
        (this as UITransform).height = val.y;
    },
    enumerable: false,
    configurable: true
});

Vec3.prototype.ToV3String = function():string{
    let v:Vec3 = this as Vec3;
    return `${v.x},${v.y},${v.z}`
};

Object.defineProperty(Toggle.prototype, "isOn", {
    get: function () {
        return (this as Toggle).isChecked;
    },
    set: function (val:boolean) {
        (this as Toggle).isChecked = val;
    },
    enumerable: false,
    configurable: true
});

ScrollView.prototype.StopMovement = function(){
    (this as ScrollView).stopAutoScroll();
};

Array.prototype.Clear = function () {
    let r = this as Array<any>;
    r.splice(0, r.length);
};

Array.prototype.IndexOf = function (val: any) {
    return (this as Array<any>).indexOf(val);
};

Array.prototype.Remove = function (val: any): boolean {
    let arr: Array<any> = this as Array<any>;
    let index = arr.indexOf(val); // 找到元素 3 的索引位置
    if (index > -1) {
        arr.splice(index, 1); // 从数组中删除元素 3
        return true;
    } else {
        return false;
    }
};

Array.prototype.AddRange = function(arr:Array<any>):void{
    if(null == arr)return;
    for (let index = 0; index < arr.length; index++) {
        (this as Array<any>).push(arr[index]);
    }
}

Array.prototype.Contains = function(val:any):boolean{
    return (this as Array<any>).indexOf(val)>=0;
}

Array.prototype.RemoveAt = function(index:number):void{
    (this as Array<any>).splice(index, 1);
}

Array.prototype.Insert = function(index:number, param:any):void{
    (this as Array<any>).splice(index,0,param);
}

// Array.prototype.firstOrDefault = function (predicate: (item: any) => boolean) { for (var i = 0; i < (<Array<any>>this).length; i++) { let item = (<Array<any>>this)[i]; if (predicate(item)) { return item; } } return null; }
// Array.prototype.where = function (predicate: (item: any) => boolean) { let result = []; for (var i = 0; i < (<Array<any>>this).length; i++) { let item = (<Array<any>>this)[i]; if (predicate(item)) { result.push(item); } } return result; }
// Array.prototype.remove = function (item: any): boolean { let index = (<Array<any>>this).indexOf(item); if (index >= 0) { (<Array<any>>this).splice(index, 1); return true; } return false; }Array.prototype.removeRange = function (items: any[]): void { for (var i = 0; i < items.length; i++) { (<Array<any>>this).remove(items[i]); } }
// Array.prototype.add = function (item: any): void { (<Array<any>>this).push(item); }
// Array.prototype.addRange = function (items: any[]): void { for (var i = 0; i < items.length; i++) { (<Array<any>>this).push(items[i]); } }
// Array.prototype.orderBy = function (propertyExpression: (item: any) => any) { let result = []; var compareFunction = (item1: any, item2: any): number => { if (propertyExpression(item1) > propertyExpression(item2)) return 1; if (propertyExpression(item2) > propertyExpression(item1)) return -1; return 0; } for (var i = 0; i < (<Array<any>>this).length; i++) { return (<Array<any>>this).sort(compareFunction); } return result; }
// Array.prototype.orderByDescending = function (propertyExpression: (item: any) => any) { let result = []; var compareFunction = (item1: any, item2: any): number => { if (propertyExpression(item1) > propertyExpression(item2)) return -1; if (propertyExpression(item2) > propertyExpression(item1)) return 1; return 0; } for (var i = 0; i < (<Array<any>>this).length; i++) { return (<Array<any>>this).sort(compareFunction); } return result; }
// Array.prototype.orderByMany = function (propertyExpressions: [(item: any) => any]) { let result = []; var compareFunction = (item1: any, item2: any): number => { for (var i = 0; i < propertyExpressions.length; i++) { let propertyExpression = propertyExpressions[i]; if (propertyExpression(item1) > propertyExpression(item2)) return 1; if (propertyExpression(item2) > propertyExpression(item1)) return -1; } return 0; } for (var i = 0; i < (<Array<any>>this).length; i++) { return (<Array<any>>this).sort(compareFunction); } return result; }
// Array.prototype.orderByManyDescending = function (propertyExpressions: [(item: any) => any]) { let result = []; var compareFunction = (item1: any, item2: any): number => { for (var i = 0; i < propertyExpressions.length; i++) { let propertyExpression = propertyExpressions[i]; if (propertyExpression(item1) > propertyExpression(item2)) return -1; if (propertyExpression(item2) > propertyExpression(item1)) return 1; } return 0; } for (var i = 0; i < (<Array<any>>this).length; i++) { return (<Array<any>>this).sort(compareFunction); } return result; }


Layers["nameToLayerMask"] = function(name:string):number{
    let layer:number = Layers.nameToLayer(name);
    return 1<<layer;
}

Toggle.prototype.onValueChanged = function(cb:(isOn:boolean)=>void):void{
    (this as Toggle).node.on(Toggle.EventType.TOGGLE,()=>{
        if(cb){
            cb((this as Toggle).isChecked);
        }
    });
}

Node.prototype.GetChild = function(index:number):Node{
    let node:Node = this as Node;
    return node.children[index];
}

Node.prototype.SetActive = function(v:boolean):void{
    (this as Node).active = v;
}

Camera.prototype.IsInScreen = function(worldPos:Vec3):boolean{
    let result:Vec3 = new Vec3(0,0,0);
    (this as Camera).worldToScreen(worldPos,result);
    let size =  view.getCanvasSize()
    return result.x>=0&&result.y>=0&&result.x<size.width&&result.y<size.height;
}

Object.defineProperty(Slider.prototype, "value", {
    get: function () {
        return (this as Slider).progress;
    },
    set:function(val:number){
        (this as Slider).progress = val;
    },
    enumerable: false,
    configurable: true
});

Slider.prototype.AddListener = function(cb: (progress: number) => void,thisObj:any):void{
    if(null == cb)return;
    let slider = this as Slider;
    slider.node.on("slide",()=>{
        if(null == thisObj){
            cb(slider.progress);
        }else{
            (cb.bind(thisObj))(slider.progress);
        }
    },this);
}


String.prototype.Split = function(tag:string):Array<string>{
    return (this as string).split(tag);
}

String.prototype.Trim = function():string{
    return (this as string).trim();
}

String.prototype.Contains = function(value:string):boolean{
    return (this as string).indexOf(value)>=0;
}

String.prototype.Replace = function(s1:string,s2:string):string{
    return (this as string).replace(s1,s2);
}

String.prototype.ToInt = function():number{
    return Number(this);
}

String.prototype.ToFloat = function():number{
    return Number(this);
}

Number.prototype.CompareTo = function(value:number):number{
    if(this<value)return -1;
    if(this>value)return 1;
    return 0;
}

Number.prototype.ToString = function():string{
    return (this as number).toString();
}

export const InitExtension = function () {
    console.log("InitExtendsion succeed");
};
