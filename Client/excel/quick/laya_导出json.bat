cd ../tool
ExcelTool to_json ../quick ./output/json/ "#"
copy /y .\output\json\*.json ..\..\..\SeaServer\code\tool\h5client\bin\excel\*.json
pause
