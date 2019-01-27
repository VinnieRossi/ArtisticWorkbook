import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class CopingService {

    private dataSection: Array<Array<string>> = new Array<Array<string>>();
    private nameMap: Map<string, string> = new Map<string, string>();

    constructor() {

        this.nameMap.set(`12"x12" Bullnose`, `Pool will have Bullnose Travertine Coping (1 ¼” thick).`);

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

    public getCopingName(row: Array<string>): string {

        const probableName = row[2] ? row[2] : row[0];

        const possibleName = this.nameMap.get(probableName);

        const result = possibleName ? possibleName : probableName;

        return result;
    }
}