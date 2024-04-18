import { Res } from "../../../engine/res/res";
import IDataReader from "./IDataReader"
import Uiform from "./Uiform";
import Uilayer from "./Uilayer";
export default class ExcelConfig {
  private static _finishCallback: Function;
  public static LoadAll(pHandle: Function) {
    this._finishCallback = pHandle;

    Res.loadJson('data/data-excel', async (err, asset) => {
      if (err) {
        console.error('Load excel error:', err);
        return;
      }
      if (!asset || !asset.json) {
        console.error('resource cache data is null', asset)
        return;
      }
      var data = asset.json;
      var pDataReader = new IDataReader();;
      Uiform.ReadData(pDataReader.setup(data, 'Uiform'));
      Uilayer.ReadData(pDataReader.setup(data, 'Uilayer'));
      ExcelConfig._finishCallback();
    });
  }
}