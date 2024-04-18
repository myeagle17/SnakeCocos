import Debugger from "../../../engine/debug/Debugger";
import Dictionary from "../../../engine/util/Dictionary";


class RecordData
{
	m_nID:number;
	m_arrData:string[]=[];

	constructor(nID:number)
	{
		this.m_nID = nID;
	}
	public SetupData(arrData)
	{
		this.m_arrData = arrData;
	}

	public GetInt32(nColumm)
	{
		if(nColumm<0||nColumm>=this.m_arrData.length)
			return -1;
		return parseInt(this.m_arrData[nColumm]);
	}
	
	public GetFloat(nColumm)
	{
		if(nColumm<0||nColumm>=this.m_arrData.length)
			return -1;
		return parseFloat(this.m_arrData[nColumm]);
	}

	public GetString(nColumm):string
	{
		if(nColumm<0||nColumm>=this.m_arrData.length)
			return "";
		return this.m_arrData[nColumm];
	}
	public GetBoolean(nColumm):boolean
	{
		if(nColumm<0||nColumm>=this.m_arrData.length)
			return false;
		var szValue = this.m_arrData[nColumm];
		if(szValue == null||szValue.length == 0)
			return false;
		
		if(szValue.toLowerCase()=="false")
			return false;
		return true;
	}



}

enum EDataType
{
	t_int,
	t_string
}

class CFieldDefine
{
	m_nFieldID:number;
	m_eType:EDataType;
	m_szFieldName:string;

	constructor(nID:number,eType:EDataType,szName:string)
	{
		this.m_nFieldID = nID;
		this.m_eType = eType;
		this.m_szFieldName = szName;
	}

}

export default class IDataReader {

	//字段定义
	//private m_dicFields = new Dictionary<string,CFieldDefine>();

	//记录列表
	private m_dicRecord = new Dictionary<number,RecordData>();

	//private m_arrItems:RecordData[]=[];
	
	//当前读取的行数
	private m_nCurrentRecord= -1;
	private m_pCurrentRecord:RecordData= null;
	private _szExcelName:string;



	public setup(data, szExcelName:string):IDataReader{
		this.m_dicRecord.Clear();
		this.m_nCurrentRecord=-1;
		this.m_pCurrentRecord= null;
		this._szExcelName = szExcelName;
		this.LoadData(data[szExcelName]);
		return this;
	}

	public LoadData(pData: any )
	{
		if(pData == null)
		{
			Debugger.LogError("IDataReader.LoadData error! json not find! excel="+this._szExcelName);
			return;
		}

		var pItems = pData.items;
		for(var i= 0;i<pItems.length;i++)
		{
			if(!this.AddRecord( pItems[i]))
				Debugger.LogError("db"+"添加记录错误:"+this._szExcelName+"记录行数:"+i);
				//this.AddMapItem(pItem.layer, pItem.oid,pItem.name,pItem.pos[0],pItem.pos[1],pItem.source);
		}
	}





	private AddRecord(szData:string):boolean
	{
		if(szData == null)
		{
			Debugger.LogError("db"+"IDataReader.AddRecord szData is null");
			return false;
		}	
		var arrData = szData.split("#");

		var nID:number = parseInt( arrData[0]);
		if(this.m_dicRecord.ContainsKey(nID))
		{
			Debugger.LogError("db"+"IDataReader.AddRecord 主键重复："+nID+szData);	
			return false;
		}

		var pRecord = new RecordData(nID);
		pRecord.SetupData(arrData);
		this.m_dicRecord.push(nID,pRecord);

		return true;
	}

	private GetDataType(szType:string)
	{
		if(szType == "int")
			return EDataType.t_int;
		return EDataType.t_string;
	}

	public Read():boolean
	{
		this.m_nCurrentRecord++;
		this.m_pCurrentRecord = this.m_dicRecord.GetValueByArrayID(this.m_nCurrentRecord);
		if(this.m_pCurrentRecord == null)
			return false;
		return true;
	}

	public GetInt32(nColumm:number):number
	{

		if(this.m_pCurrentRecord ==null)
		{
			return -1;
		}
		 return this.m_pCurrentRecord.GetInt32(nColumm);
	}

	public GetFloat(nColumm:number):number
	{

		if(this.m_pCurrentRecord ==null)
		{
			return -1;
		}
		 return this.m_pCurrentRecord.GetFloat(nColumm);
	}

	public GetString(nColumn:number):string
	{
		if(this.m_pCurrentRecord ==null)
		{
			return "";
		}
		return this.m_pCurrentRecord.GetString(nColumn);
	}

	public GetBoolean(nColumn:number):boolean
	{
		if(this.m_pCurrentRecord ==null)
		{
			return false;
		}
		return this.m_pCurrentRecord.GetBoolean(nColumn);
	}


}