/** @format */

export default class GameData {
    public static UID: number = -1;
    public static Score: number = 0;
    public static LeftTimeSec: number = 0; //关卡剩余秒数

    public static Reset() {
        GameData.Score = 0;
        GameData.LeftTimeSec = 0;
    }
}
