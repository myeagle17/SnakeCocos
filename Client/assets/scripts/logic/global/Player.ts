import Property from "./Property";
import { PropertyEnum } from './Property';

export default class Player{
    public properties:Array<Property> = [];

    public constructor(){
        
    }

    public InitProperties(){
        this.properties = [];
        this.properties.push(Property.Create(PropertyEnum.SCORE,0));
        this.properties.push(Property.Create(PropertyEnum.TIME,0));
    }
}