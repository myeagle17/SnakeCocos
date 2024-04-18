import md5 from "./md5";

export default class StringTool {
    static pwdMd5: md5;
    static chineseReg = /[\u4E00-\u9FA5\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]/;

    public constructor() {}
    //StringTool.Format("w{0},w{1}",123,456)
    //输出 "w123w456"
    public static Format(src, ...arg: any[]): string {
        if (arguments.length == 0) return null;

        var args = Array.prototype.slice.call(arguments, 1);

        return src.replace(/\{(\d+)\}/g, function (m, i) {
            return args[i];
        });
    }
    public static GetMd5(szInput: string): string {
        if (this.pwdMd5 == null) {
            this.pwdMd5 = new md5();
        }

        var szPwdMd5 = this.pwdMd5.hex_md5(szInput);
        return szPwdMd5;
    }

    /****获取字符串总长度 */
    public static getLength(str: string) {
        ///<summary>获得字符串实际长度，中文2，英文1</summary>
        ///<param name="str">要获得长度的字符串</param>
        var realLength = 0,
            len = str.length,
            charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    }
    public static zip(str) {
        var json = {};
        json["to"] = "string";
        var zipData: any = pako.gzip(str, json);

        return btoa(zipData);
    }
    public static unzip(b64Data) {
        let strData = atob(b64Data);
        const charData = strData.split("").map(function (x) {
            return x.charCodeAt(0);
        });
        const binData = new Uint8Array(charData);
        const data = pako.inflate(binData);
        // return String.fromCharCode.apply(null, new Uint16Array(data));
        //return decodeURIComponent(strData);
        return StringTool.ab2str(data);
    }

    // ArrayBuffer转为字符串，参数为ArrayBuffer对象
private static ab2str(buf: ArrayBuffer): string {
    var binaryString = '';
    let bytes = new Uint16Array(buf);
    let length = bytes.length;
    for (var i = 0; i < length; i++) {
      binaryString += String.fromCharCode(bytes[i]);
    }
    return binaryString;
  }
    public static lengthUTF8(str: string) {
        var i = 0,
            code,
            len = 0;
        for (; i < str.length; i++) {
            code = str.charCodeAt(i);
            if (code == 10) {
                //回车换行问题
                len += 2;
            } else if (code < 0x007f) {
                len += 1;
            } else if (code >= 0x0080 && code <= 0x07ff) {
                len += 2;
            } else if (code >= 0x0800 && code <= 0xffff) {
                len += 3;
            }
        }
        return len;
    }
    public static lengthUTF8ByCode(code) {
        let len = 0;
        if (code == 10) {
            //回车换行问题
            len = 2;
        } else if (code < 0x007f) {
            len = 1;
        } else if (code >= 0x0080 && code <= 0x07ff) {
            len = 2;
        } else if (code >= 0x0800 && code <= 0xffff) {
            len = 3;
        }
		return len;
    }

    public static IsNullOrEmpty(str: string): boolean {
        return str == null || str === "";
    }

    public static IsChinese(char){
        return this.chineseReg.test(char);
    }

    public static CalLabWidth(str:string , englishWidth:number, chineseWidth:number){
        let width:number = 0;
        for(let char of str){
            width+=StringTool.IsChinese(char)?chineseWidth:englishWidth;
        }
        return width;
    }

}
