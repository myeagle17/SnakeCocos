
import { errorMonitor } from "stream";
import Server from "./net/Sever";
import ModulePlayer from "./player/ModulePlayer";

console.log("hello worl");
let p = new ModulePlayer();
p.Init();

new Server().Start(8110);
