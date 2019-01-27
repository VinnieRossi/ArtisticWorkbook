import { WorkbookService } from './../../../providers/workbook.service';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class FasciaService {

    constructor(
        private workbookService: WorkbookService
    ) {
    }

    public getNameMap(): Map<string, string> {

        const nameMap: Map<string, string> = new Map<string, string>();

        nameMap.set(`- Country classic, rainbow, ivory, noche`, `Split face Travertine`);
        nameMap.set(`- Pearl`, `Split face Travertine`);
        nameMap.set(`- Stucco - SQ FT`, `Split face Travertine`);

        return nameMap
    }

    public getFasciaName(row: Array<string>): string {

        const nameMap: Map<string, string> = this.getNameMap();

        const probableName = row[0];

        const mappedName = nameMap.get(probableName);

        const result = mappedName ? mappedName : probableName;

        return result;

    }

    public getFasciaDataFromSection(fasciaSectionData: Array<Array<string>>): Array<string> {

        const fasciaList: Array<string> = [];

        const ignoreSet: Set<string> = this.workbookService.getGlobalIgnoreSet();

        fasciaSectionData.forEach(row => {

            const properEquipmentName = this.getFasciaName(row);

            if (ignoreSet.has(properEquipmentName)) { return; }

            const cost = parseFloat(row[6]);
            const chargedAmount = parseFloat(row[8]);
            // If we charged them the cost for the part, it means it was included

            const itemWasIncluded = (cost && cost === chargedAmount);
            const multipleItemsIncluded = (cost && chargedAmount > cost);

            if (itemWasIncluded) {

                fasciaList.push(`${properEquipmentName}`);

            } else if (multipleItemsIncluded) {

                const quantity = this.workbookService.determineRowQuantity(cost, chargedAmount);

                fasciaList.push(`Raised wall to be faced with (${quantity}) SF of ${properEquipmentName}`);
            }
        });

        return fasciaList;
    }

}