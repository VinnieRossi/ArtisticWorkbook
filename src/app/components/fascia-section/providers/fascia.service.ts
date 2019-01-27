import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class FasciaService {

    private dataSection: Array<Array<string>> = new Array<Array<string>>();
    private nameMap: Map<string, string> = new Map<string, string>();

    constructor() {

        this.nameMap.set(`- Country classic, rainbow, ivory, noche`, `Split face Travertine`);
        this.nameMap.set(`- Pearl`, `Split face Travertine`);
        this.nameMap.set(`- Stucco - SQ FT`, `Split face Travertine`);

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

    public getFasciaName(row: Array<string>): string {

        const probableName = row[0];

        const mappedName = this.nameMap.get(probableName);

        const result = mappedName ? mappedName : probableName;

        return result;

    }

}