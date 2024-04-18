declare module "cc" {
    interface Node {
        Reset():void;
        SetLayer(layerName:string):void;
        GetChild(index:number):Node;
        getComponentInParent<T extends Component>(classConstructor: new (...args: any[]) => T): T | null;
        AddComponent<T extends Component>(classConstructor: __private._types_globals__Constructor<T>): T;
        FindChildEx(goName:string):Node;
        GetOrAddComponent<T extends Component>(classConstructor: __private._types_globals__Constructor<T>): T;
        Find(path:string):Node;
        get node():Node;
        SetActive(v:boolean):void;
        get childCount():number;
    }

    interface MeshRenderer{
        SetColor(tag:string ,color:Color):void;
    }

    interface Sprite {
        SetSprite(spriteName:SpriteFrame):void;
        SetSpritePath(path:string):void;
        SetTextureByResources(path:string,setNativeSize:boolean):void;
        SetTextureByResources(path:string):void;
        SetSpriteAsync(atlas:string,path:string ,cb:(sp:Sprite)=>void):void;
        set alpha(val:number);
    }
    
    interface Vec3{
        ToV3String():string;
    }

    interface Component {
        Destroy(c:Component):void;
    }

    interface Button {
        AddListener(cb:()=>void,thisObj:any):void;
        set m_CanClick(val:boolean);
        get m_CanClick():boolean;
    }

    interface Label {
        set text(val:string);
        get text():string;
        get preferredWidth():number;
        get preferredHeight():number;
    }

    interface UITransform{
        set sizeDelta(size:Vec2);
        get sizeDelta():Vec2;
    }

    interface Toggle{
        set isOn(val:boolean);
        get isOn():boolean;
        onValueChanged(cb:(isOn:boolean)=>void):void;
    }
    interface ScrollView{
        StopMovement():void;
    }

    interface Camera{
        IsInScreen(pos:Vec3):boolean;
    }

    interface Slider{
        get value():number;
        set value(val:number);
        AddListener(cb:(progress:number)=>void , thisObj:any):void;
    }
}

interface Array<T> {
    Clear():void;
    IndexOf(val:T):number;
    Remove(val:T):boolean;
    AddRange(arr:Array<T>):void;
    Contains(val:T):boolean;
    RemoveAt(index:number):void;
    Insert(index:number, param:T):void;
}

interface String{
    Split(tag:string):Array<string>;
    Trim():string;
    Contains(value:string):boolean;
    Replace(s1:string,s2:string):string;
    ToInt():number;
    ToFloat():number;
}

interface Number{
    CompareTo(value:number):number;
    ToString():string;
}
