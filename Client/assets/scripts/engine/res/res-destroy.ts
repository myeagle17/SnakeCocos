/*
 Copyright (c) 2020-2023 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 of the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

import { _decorator, Component, Node } from 'cc';
import { Msg } from '../msg/msg';
import { ILoadMsg } from '../../logic/ui/ui-loading';
import { Level } from '../../logic/level/level';
const { ccclass, property } = _decorator;

@ccclass('ResDestroy')
export class ResDestroy extends Component {

    isDestroy = false;
    msg:ILoadMsg | undefined;

    start() {
        Msg.bind('msg_destroy_res', ()=>{
            this.isDestroy = true;
            const length = this.node.children.length - 1;
            this.msg = {
                id:0,
                action:'destroy',
                current:' objects node. ',
                wait_count:length,
                count:length,
            }
            Msg.emit('msg_loading', this.msg);

            if ((globalThis as any).ppSettings) {
                (globalThis as any).ppSettings.passVersion++;

                console.log('msg_destroy_res: passVersion - ' + (globalThis as any).ppSettings.passVersion)
            }

        }, this);
    }

    update(deltaTime: number) {
        if(this.isDestroy) {
            const length = this.node.children.length - 1;
            this.msg!.wait_count = length;
            //this.msg!.current = this.node.children[length].name;
            if(length <= -1) {
                this.isDestroy = false;
                console.log('res is destroy');
                return;
            }
            this.node.children[length].destroy();
        }
    }
}

