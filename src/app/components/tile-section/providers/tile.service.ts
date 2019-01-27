import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class TileService {

    private dataSection: Array<Array<string>> = new Array<Array<string>>();

    constructor() {

    }

    public setSection(section: Array<Array<string>>): void {
        this.dataSection = section;
    }

    public getDataSection(): Array<Array<string>> {
        return this.dataSection;
    }
}