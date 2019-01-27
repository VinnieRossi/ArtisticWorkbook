
import { Injectable } from "@angular/core";
import { WorkbookService } from "src/app/shared/providers/workbook.service";

@Injectable({
    providedIn: 'root',
})
export class CopingService {

    private dataSection: Array<Array<string>> = new Array<Array<string>>();

    constructor(
        private workbookService: WorkbookService
    ) {

    }

    public getNameMap(): Map<string, string> {

        const nameMap: Map<string, string> = new Map<string, string>();

        nameMap.set(`12"x12" Bullnose`, `Pool will have Bullnose Travertine Coping (1 ¼” thick).`);

        return nameMap;
    }

    public setSection(section: Array<Array<string>>): void {
        this.dataSection = section;
    }

    public getDataSection(): Array<Array<string>> {
        return this.dataSection;
    }

    public getCopingName(row: Array<string>): string {

        const nameMap: Map<string, string> = this.getNameMap();

        const probableName = row[2] ? row[2] : row[0];

        const possibleName = nameMap.get(probableName);

        const result = possibleName ? possibleName : probableName;

        return result;
    }

    public getCopingDataFromSection(copingIgnoreSet?: Set<string>): Array<string> {

        const copingSectionData: Array<Array<string>> = this.workbookService.getCopingSection();

        const copingList: Array<string> = [];

        const ignoreSet: Set<string> = this.workbookService.getGlobalIgnoreSet();

        copingSectionData.forEach(row => {

            const properCopingName = this.getCopingName(row);

            if (ignoreSet.has(properCopingName)) {
                return;
            }

            const cost = parseFloat(row[8]);

            const itemWasIncluded = (cost);

            if (properCopingName && itemWasIncluded) {
                copingList.push(properCopingName);
            }
        });

        return copingList;
    }

}