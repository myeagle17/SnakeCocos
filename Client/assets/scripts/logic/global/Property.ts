export enum PropertyEnum{
    SCORE = 1,
    TIME = 2,    
}

export default class Property{
    public val:number = 0;
    public type:PropertyEnum 


    public static Create(type:PropertyEnum,val:number):Property{
        let p = new Property();
        p.type = type;
        p.val = val;
        return p;
    }
}