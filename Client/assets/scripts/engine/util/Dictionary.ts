/**字典数据结构类 */
export class KeyValuePair<K,V>{
	public Key:K;
	public Value:V;
	constructor(k:K,v:V){
		this.Key = k;
		this.Value = v;
	}
}
export default class Dictionary<KT, VT> {
	public keys: Array<KT> = [];
	public values: Array<VT> = [];
	public isCache: boolean;
	public get count(): number {
		return this.keys.length;
	}

	public get length():number{
		return this.count;
	}

	// 就没有不是cache的情况，免得写错
	public constructor(isCache:boolean=true) {
		this.isCache = isCache;
	}

	/**给字典增加一条数据,返回字典的长度 */
	public push(key: any, value: any): number {
		if(this.ContainsKey(key)){
			this[key] = value;
			return;
		}

		if (this.isCache) {
			this[key] = value;
		}
		this.keys.push(key);
		return this.values.push(value);
	}

	public Add(key:any , value:any): number {
		return this.push(key,value);
	}

	public GetValueByArrayID(nID:number)
	{
		if(nID>=this.values.length||nID<0)
			return null;
		return this.values[nID];
	}

	public Remove(key: any) {
		let index = this.keys.indexOf(key, 0);
		this.keys.splice(index, 1);
		this.values.splice(index, 1);
		if (this.isCache) {
			delete this[key];
		}
	}

	public Clear()
	{
		this.keys.Clear();
		this.values.Clear();
	}

	/**直接使用SetDicValue()修改已经存在的字典数据项，并更新缓存引用 */
	public SetDicValue(key: any, value: any): boolean {
		let index = this.keys.indexOf(key, 0);
		if (index != -1) {
			this.keys[index] = key;
			this.values[index] = value;
			if (this.isCache) {
				this[key] = value;
			}
			return true;
		}
		return false;
	}

	/**
	 *开启"[]"访问的情况下，缓存与字典数据为同一份，引用数据会同时修改，
	 *非引用数据不能被修改，只能访问
	 */
	public TryGetValue(key: KT): VT {
		let index = this.keys.indexOf(key, 0);
		if (index != -1) {
			return this.values[index];
		}
		return null;
	}

	public ContainsKey(key: any): boolean {
		return this.keys.Contains(key);
	}

	public get Keys():KT[]{
		return this.keys;
	}

	public GetKeys(): KT[] {
		return this.keys;
	}
	public get Values():VT[]{
		return this.values;
	}
	public GetValues(): VT[] {
		return this.values;
	}


}