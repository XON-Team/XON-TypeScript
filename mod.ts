export * from "./src/index.ts"
import {XON} from "./src/index.ts";
import * as fs from "https://deno.land/std@0.110.0/fs/mod.ts";

let input = "";
let output = "";
let type = "";

if (Deno.args) {
    for (let arg of Deno.args) {
        if (arg.toLowerCase() == "compile-xon") type = "xon";
        if (arg.toLowerCase() == "compile-xml") type = "xml";
        if (arg.toLowerCase().startsWith("in=")) input = arg.substring(3);
        if (arg.toLowerCase().startsWith("out=")) output = arg.substring(4)
    }
    if (!type) {
        console.error("Please specify whether you want to compile xml -> xon (compile-xml) or xon -> xml (compile-xon)");
        Deno.exit(-1);
    }
    if (!input) {
        console.error("Please provide a path to an input file using in=<file>");
        Deno.exit(-1);
    }
    let file = await Deno.readTextFile(input);
    let out;
    if (type == "xon") {
        out = XON.parse(file);
    }
    if (type == "xml") {
        out = XON.parse(file,true);
    }
    console.log(out);
    if (output) {
        await fs.ensureFile(output);
        //@ts-ignore
        Deno.writeTextFile(output,out);
    }
    Deno.exit(0);
}
console.error("No args given.");
Deno.exit(-1);