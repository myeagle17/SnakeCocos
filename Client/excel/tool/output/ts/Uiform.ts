 
import Dictionary from "../../../util/Dictionary";
import dbtool from "./dbtool";
import IDataReader from "./IDataReader";

export default class Uiform{
  public constructor() {
  }
	public id:number;
	public name:string;
	public tips:number;
	public uiGroupName:string;
	public allowMultiInstance:number;
	public pauseCoveredUIForm:number;
	public openInUGC:number;
	public isEsc:number;
	public statusBarColor:number;
	public hasLandscapeForm:number;
	public  GetId():number{
		return this.id;
	}
	public SetId( value:number ){
		this.id=value;
 	}
	public  GetName():string{
		return this.name;
	}
	public SetName( value:string ){
		this.name=value;
 	}
	public  GetTips():number{
		return this.tips;
	}
	public SetTips( value:number ){
		this.tips=value;
 	}
	public  GetUiGroupName():string{
		return this.uiGroupName;
	}
	public SetUiGroupName( value:string ){
		this.uiGroupName=value;
 	}
	public  GetAllowMultiInstance():number{
		return this.allowMultiInstance;
	}
	public SetAllowMultiInstance( value:number ){
		this.allowMultiInstance=value;
 	}
	public  GetPauseCoveredUIForm():number{
		return this.pauseCoveredUIForm;
	}
	public SetPauseCoveredUIForm( value:number ){
		this.pauseCoveredUIForm=value;
 	}
	public  GetOpenInUGC():number{
		return this.openInUGC;
	}
	public SetOpenInUGC( value:number ){
		this.openInUGC=value;
 	}
	public  GetIsEsc():number{
		return this.isEsc;
	}
	public SetIsEsc( value:number ){
		this.isEsc=value;
 	}
	public  GetStatusBarColor():number{
		return this.statusBarColor;
	}
	public SetStatusBarColor( value:number ){
		this.statusBarColor=value;
 	}
	public  GetHasLandscapeForm():number{
		return this.hasLandscapeForm;
	}
	public SetHasLandscapeForm( value:number ){
		this.hasLandscapeForm=value;
 	}
	public static m_dicValues:Dictionary<number, Uiform> = new Dictionary<number, Uiform>();

    public static ReadData(pReader:IDataReader):boolean
    {
        while (pReader.Read())
        {
			var pData:Uiform = new Uiform();
			pData.SetId(pReader.GetInt32(0));
			pData.SetName(pReader.GetString(1));
			pData.SetTips(pReader.GetInt32(2));
			pData.SetUiGroupName(pReader.GetString(3));
			pData.SetAllowMultiInstance(pReader.GetInt32(4));
			pData.SetPauseCoveredUIForm(pReader.GetInt32(5));
			pData.SetOpenInUGC(pReader.GetInt32(6));
			pData.SetIsEsc(pReader.GetInt32(7));
			pData.SetStatusBarColor(pReader.GetInt32(8));
			pData.SetHasLandscapeForm(pReader.GetInt32(9));
			var key = pReader.GetInt32(0);
            if(Uiform.m_dicValues.ContainsKey(key))
                return false;
            Uiform.m_dicValues.Add(key, pData);
        }
        return true;
    }
	public static GetData(nKey:number):Uiform
	{
		return this.m_dicValues.TryGetValue(nKey);
	}
}