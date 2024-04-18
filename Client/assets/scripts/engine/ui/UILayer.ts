import { Component, Layers, Node, UITransform, Widget, _decorator } from 'cc';
import { GComponent, GRoot } from 'fairygui-cc';
const { ccclass, property } = _decorator;

/**
 * 493786182
 * Fri May 12 2023 11:21:14 GMT+0800 (GMT+08:00)
 */

@ccclass('UILayer')
export class UILayer extends Component {

    private layer:Node = null;

    public init(layerName:string){
        this.layer = this.node;
        this.layer.name = layerName;
        this.layer.addComponent(UITransform);
        let widget = this.layer.addComponent(Widget);
        this.layer.layer = Layers.BitMask.UI_2D;
        widget.isAlignTop=true;
        widget.isAlignBottom = true;
        widget.isAlignLeft = true;
        widget.isAlignRight = true; 
        widget.top = 0;
        widget.bottom = 0;
        widget.left = 0;
        widget.right = 0;
    }

    public destory() {

    }
}