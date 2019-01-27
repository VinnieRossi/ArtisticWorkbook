
import { Injectable } from "@angular/core";
import { WorkbookService } from "src/app/shared/providers/workbook.service";

@Injectable({
    providedIn: 'root',
})
export class LightingService {

    constructor(
        private workbookService: WorkbookService
    ) {

    }

    public getNameMap(): Map<string, string> {

        const nameMap: Map<string, string> = new Map<string, string>();

        nameMap.set(`Savi Sol LED Light - JLU4C30W150`, `Savi Sol LED color changing pool lights.`);
        nameMap.set(`300W Transformer`, `Installation of 300 Watt Transformer.`);

        return nameMap;
    }


    public getLightingDataFromSection(): Array<string> {

        const lightingSectionData: Array<Array<string>> = this.workbookService.getLightingSection();

        const nameMap: Map<string, string> = this.getNameMap();

        const lightingList: Array<string> = [];

        const ignoreSet: Set<string> = this.workbookService.getGlobalIgnoreSet();

        lightingSectionData.forEach((row, index) => {

            const properEquipmentName = this.workbookService.getBestGuessName(row, nameMap);

            if (ignoreSet.has(properEquipmentName)) { return; }

            const cost = parseFloat(row[7]);
            const chargedAmount = parseFloat(row[8]);

            // If we charged them the cost for the part, it means it was included
            const itemWasIncluded = (cost && cost === chargedAmount);
            const multipleItemsIncluded = (cost && chargedAmount > cost)

            if (itemWasIncluded) {

                lightingList.push(`(1) ${properEquipmentName}`);

            } else if (multipleItemsIncluded) {

                const quantity = this.workbookService.determineRowQuantity(cost, chargedAmount);

                lightingList.push(`(${quantity}) ${properEquipmentName}`);
            }

        });

        // this.lightingList.push(`Installation of electrical junction boxes.`);

        return lightingList;

    }
}