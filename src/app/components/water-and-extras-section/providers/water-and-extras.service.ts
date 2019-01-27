import { Injectable } from "@angular/core";
import { WorkbookService } from "src/app/shared/providers/workbook.service";

@Injectable({
    providedIn: 'root',
})
export class WaterAndExtrasService {

    constructor(
        private workbookService: WorkbookService
    ) {
    }

    public getWaterAndExtraDataFromSection(): Array<string> {

        const waterAndExtraSectionData: Array<Array<string>> = this.workbookService.getWaterAndExtraSection();

        const waterAndExtraList: Array<string> = [];

        const ignoreSet: Set<string> = this.workbookService.getGlobalIgnoreSet();

        waterAndExtraSectionData.forEach(row => {

            const properEquipmentName = this.workbookService.getBestGuessName(row);

            if (ignoreSet.has(properEquipmentName)) { return; }

            const cost = parseFloat(row[6]);
            const chargedAmount = parseFloat(row[8]);
            // If we charged them the cost for the part, it means it was included

            const itemWasIncluded = (cost && cost === chargedAmount);
            const multipleItemsIncluded = (cost && chargedAmount > cost);

            if (itemWasIncluded) {

                waterAndExtraList.push(`(1) ${properEquipmentName}`);

            } else if (multipleItemsIncluded) {

                const quantity = this.workbookService.determineRowQuantity(cost, chargedAmount);

                waterAndExtraList.push(`(${quantity}) ${properEquipmentName}`);
            }
        });

        return waterAndExtraList;

    }
}