 
import Dictionary from "../../../util/Dictionary";
import dbtool from "./dbtool";
import IDataReader from "./IDataReader";

export default class Uilayer{
  public constructor() {
  }
	public id:number;
	public name:string;
	public plane_distance:number;
	public sorting_order:number;
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
	public  GetPlaneDistance():number{
		return this.plane_distance;
	}
	public SetPlaneDistance( value:number ){
		this.plane_distance=value;
 	}
	public  GetSortingOrder():number{
		return this.sorting_order;
	}
	public SetSortingOrder( value:number ){
		this.sorting_order=value;
 	}
	public static m_dicValues:Dictionary<number, Uilayer> = new Dictionary<number, Uilayer>();

    public static ReadData(pReader:IDataReader):boolean
    {
        while (pReader.Read())
        {
			var pData:Uilayer = new Uilayer();
			pData.SetId(pReader.GetInt32(0));
			pData.SetName(pReader.GetString(1));
			pData.SetPlaneDistance(pReader.GetFloat(2));
			pData.SetSortingOrder(pReader.GetInt32(3));
			var key = pReader.GetInt32(0);
            if(Uilayer.m_dicValues.ContainsKey(key))
                return false;
            Uilayer.m_dicValues.Add(key, pData);
        }
        return true;
    }
	public static GetData(nKey:number):Uilayer
	{
		return this.m_dicValues.TryGetValue(nKey);
	}
}