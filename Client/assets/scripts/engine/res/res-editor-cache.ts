import { _decorator, Component, Node, JsonAsset, Prefab } from 'cc';
import { ResCache } from './res-cache';
const { ccclass, property } = _decorator;

@ccclass('ResEditorCache')
export class ResEditorCache extends Component {

    @property(JsonAsset)
    jsonAssets: JsonAsset[] | null = [];

    @property(Prefab)
    prefabs: Prefab[] = [];

    init() {
        ResCache.Instance.setJson(this.jsonAssets);
        ResCache.Instance.setPrefab(this.prefabs);
    }

}

