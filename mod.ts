export * from "./src/index.ts"
import {XON} from "./src/index.ts";

console.log(XON.parse(Deno.readTextFileSync("./testXon.xon")));