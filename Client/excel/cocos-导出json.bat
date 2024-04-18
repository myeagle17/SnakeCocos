cd tool
ExcelTool cmd:to_json_single,excelpath:../data,output :./output/json/,sep:"#",filter:xiaoyouxi+laya
copy /y .\output\json\data-excel.json ..\..\assets\resources\data\data-excel.json

pause
