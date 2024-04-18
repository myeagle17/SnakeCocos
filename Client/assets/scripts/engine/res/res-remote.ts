import { Asset, SpriteFrame, assetManager, error } from "cc";
import { BaseClass } from "../pattern/BaseClass";


export class ResRemote extends BaseClass {
    public static ins(): ResRemote {
        return super.ins() as ResRemote;
    }

    public loadImgByUrl(url: string, back: Function) {
        assetManager.loadRemote<SpriteFrame>(url, (err: Error, data: Asset) => {
            if (err) {
                error(url, err.message || err);
            }
            if (back) {
                back(err, data);
            }
        });
    }
}