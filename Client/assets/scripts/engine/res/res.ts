import { _decorator, resources, Node, Asset, error, Constructor, Prefab, instantiate, TextAsset, JsonAsset, Texture2D, EffectAsset, AudioClip, AnimationClip, ImageAsset, SpriteFrame, SpriteAtlas, Mesh, Material, Skeleton, SceneAsset, Vec3, director } from 'cc';
import { Msg } from '../msg/msg';

/**
 * 加载resources 文件夹中的资源，AssetBundle中的资源无法加载
 * 路径从 resources 下开始
 */
export class Res {

    public static count: number = 0;

    public static load<T extends Asset>(path: string, type: Constructor<T> | null, cb?: (err: Error | null, asset?: T | null)=>void) {
        this.count++;
        resources.load(path, type, function(err, res){
            if (err){
                error(path,err.message || err);
                Msg.emit('msg_res_error');
            }
            if (cb) {
                cb(err, res);
            }
            Res.count--;
            Msg.emit('msg_check_res_cache_end');
        });
    }

    public static loadJson(path: string, cb?: (err: Error | null, asset?: JsonAsset | null)=>void) {
        this.load(path, JsonAsset, cb);
    }

    public static loadTxt(path: string, cb?: (err: Error | null, asset?: TextAsset | null)=>void) {
        this.load(path, TextAsset, cb);
    }

    public static loadPrefab(path: string, cb?: (err: Error | null, asset?: Prefab | null)=>void) {
        this.load(path, Prefab, cb);
    }

    public static loadTex2D(path: string, cb?: (err: Error | null, asset?: Texture2D | null)=>void) {
        this.load(path, Texture2D, cb);
    }
    
    public static loadImage(path: string, cb?: (err: Error | null, asset?: ImageAsset | null)=>void) {
        this.load(path, ImageAsset, cb);
    }

    public static loadSprite(path: string, cb?: (err: Error | null, asset?: SpriteFrame | null)=>void) {
        this.load(path, SpriteFrame, cb);
    }

    public static loadSpriteAtlas(path: string, cb?: (err: Error | null, asset?: SpriteAtlas | null)=>void) {
        this.load(path, SpriteAtlas, cb);
    }

    public static loadEffect(path: string, cb?: (err: Error | null, asset?: EffectAsset | null)=>void) {
        this.load(path, EffectAsset, cb);
    }

    public static loadAudio(path: string, cb?: (err: Error | null, asset?: AudioClip | null)=>void) {
        this.load(path, AudioClip, cb);
    }

    public static loadAnimationClip(path: string, cb?: (err: Error | null, asset?: AnimationClip | null)=>void) {
        this.load(path, AnimationClip, cb);
    }

    public static loadMesh(path: string, cb?: (err: Error | null, asset?: Mesh | null)=>void) {
        this.load(path, Mesh, cb);
    }

    public static loadMateiral(path: string, cb?: (err: Error | null, asset?: Material | null)=>void) {
        this.load(path, Material, cb);
    }

    public static loadSkeleton(path: string, cb?: (err: Error | null, asset?: Skeleton | null)=>void) {
        this.load(path, Skeleton, cb);
    }

    public static loadScene(path: string, cb?: (err: Error | null, asset?: SceneAsset | null)=>void) {
        this.load(path, SceneAsset, cb);
    }


    public static inst(asset: Prefab, root:Node | undefined = undefined,  pos:Vec3 = Vec3.ZERO) : Node {
        const instObj = instantiate(asset);
        if (root === undefined) {
            director.getScene()?.addChild(instObj);
        }else{
            instObj.setParent(root);
        }
        instObj.setPosition(pos);
        instObj.setScale(Vec3.ONE);
        return instObj;
    }

    public static instNode(node:Node, root:Node | undefined = undefined, pos:Vec3 = Vec3.ZERO) : Node {
        const instObj = instantiate(node);
        if (root === undefined) {
            director.getScene()?.addChild(instObj);
        }else{
            instObj.setParent(root);
        }
        instObj.setPosition(pos);
        instObj.setScale(Vec3.ONE);
        return instObj;
    }

    public static loadDir<T extends Asset>(path: string, type: Constructor<T> | null, cb?: (err: Error | null, asset?: T[] | null)=>void) {
        this.count++;
        resources.loadDir(path, type, function(err, res){
            if (err){
                error(err.message || err);
                Msg.emit('msg_res_error');
            }
            if (cb) {
                cb(err, res);
            }
            Res.count--;
            Msg.emit('msg_check_res_cache_end');
        });
    }

    public static loadDirJson(path:string, cb?: (err: Error | null, asset?: JsonAsset[] | null)=>void) {
        this.loadDir(path, JsonAsset, cb);
    }

    public static loadDirPrefab(path:string, cb?: (err: Error | null, asset?: Prefab[] | null)=>void) {
        this.loadDir(path, Prefab, cb);
    }

    public static loadDirText(path:string, cb?: (err: Error | null, asset?: TextAsset[] | null)=>void) {
        this.loadDir(path, TextAsset, cb);
    }

    public static loadDirSprite(path:string, cb?: (err: Error | null, asset?: SpriteFrame[] | null)=>void) {
        this.loadDir(path, SpriteFrame, cb);
    }

    public static loadDirSound(path:string, cb?: (err:Error | null, asset?: AudioClip[] | null)=>void) {
        this.loadDir(path, AudioClip, cb);
    }

}
