import { parseXml } from "./XmlProcessor.ts";
import { XMLDoc, XMLNode } from "./types.ts";

export default class XonParser {

    constructor() {

    }

    public parse(input: string, isXml: boolean = false): string {
        if (isXml) return this.parseXml(input);
        return this.parseXon(input);
    }

    private parseXon(input: string): string {
        return "";
    }

    private parseXml(input: string): string {
        let xml = parseXml(input);
        if (!xml) return "";
        let root = xml.root;
        
        return this.convertToXon(root);
    }

    private convertToXon(root: XMLNode, indent: string = ""): string {
        let output = "";
        if (!root.tag) return "";
        output += root.tag + " ";
        if (root.keys)
            for (let key in root.keys)
                output += key + "=\"" + root.keys[key] + "\" ";
        if (root.sub) {
            if (root.sub.length == 1 && typeof root.sub[0] == "string")
                output += "\"" + root.sub[0] + "\"";
            else {
                output += "{\n";
                for (let sub of root.sub) {
                    if (typeof sub == "string") output += indent + "  \"" + sub + "\"\n";
                    else output += this.convertToXon(sub, indent + "  ");
                }
                output += "\n"+indent+"}";
            }
        }
        if (root.close) output = "\\" + output + "\n";
        return indent + output;
    }
}