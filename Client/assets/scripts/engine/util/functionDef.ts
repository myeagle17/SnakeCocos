export interface callBackOneParameter<typeOne, typeTwo =void> {
    (param1: typeOne): typeTwo;
  }

export interface ActionOne<typeOne,typeTwo=void>{
  (param1:typeOne):typeTwo;
}

export interface Action{
  ():void;
}

export interface ActionTwo<typeOne,typeTwo>{
  (p1:typeOne,p2:typeTwo):void
}
