cd tool
ExcelTool cmd:excel_to_ts,excelpath:../data,output :./output/ts/,manager:ExcelConfig,filter:xiaoyouxi+laya,engine:cocos
copy /y .\output\ts\*.ts ..\..\assets\scripts\logic\data\excel\*.ts
pause