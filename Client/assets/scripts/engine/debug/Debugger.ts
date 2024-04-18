export default class Debugger{
    static Init() {}

    static info(data: any): void {
        console.info(data);
    }

    static debug(data: any): void {
        console.log(data);
    }

    static LogError(data: any): void {
        console.error(data);
    }

    static warn(data: any): void {
        console.warn(data);
    }
}