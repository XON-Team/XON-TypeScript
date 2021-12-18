export * from "./src/index.ts"
import {XON} from "./src/index.ts";

XON.parse(Deno.readTextFileSync("./testXml.xml"), true);