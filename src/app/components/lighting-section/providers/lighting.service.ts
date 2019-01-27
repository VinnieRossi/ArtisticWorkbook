import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class LightingService {

    private dataSection: Array<Array<string>> = new Array<Array<string>>();
    private nameMap: Map<string, string> = new Map<string, string>();

    constructor() {

        this.nameMap.set(`Savi Sol LED Light - JLU4C30W150`, `Savi Sol LED color changing pool lights.`);
        this.nameMap.set(`300W Transformer`, `Installation of 300 Watt Transformer.`);

    }

    public getNameMap(): Map<string, string> {
        return this.nameMap;
    }

    public setSection(section: Array<Array<string>>): void {
        this.dataSection = section;
    }

    public getDataSection(): Array<Array<string>> {
        return this.dataSection;
    }
}