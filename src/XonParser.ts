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
        console.log(xml.root);
        return "";
    }
}