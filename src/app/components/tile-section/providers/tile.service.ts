import { Injectable } from "@angular/core";
import { WorkbookService } from "src/app/shared/providers/workbook.service";

@Injectable({
    providedIn: 'root',
})
export class TileService {

    constructor(
        private workbookService: WorkbookService
    ) {
    }

    public getNameMap(): Map<string, string> {

        const nameMap: Map<string, string> = new Map<string, string>();

        return nameMap;
    }

    public getTileDataFromSection(): Array<string> {

        const tileSectionData: Array<Array<string>> = this.workbookService.getTileSection();

        if (!tileSectionData || tileSectionData.length === 0) { return; }

        const tileList: Array<string> = [];

        const tileLaborCost = parseFloat((tileSectionData[11])[6]);

        const tileInformationText = `Installation of 6” x 6” pool tile`;

        const tileLaborText = `Includes tile cost of up to $${tileLaborCost}/SF`;

        tileList.push(tileInformationText, tileLaborText);

        return tileList;

        // this.tileInformation.forEach(row => {

        //   const properEquipmentName = this.getEquipmentName(row);

        //   if (this.ignoreSet.has(properEquipmentName)) { return; }

        //   const cost = parseFloat(row[6]);
        //   const chargedAmount = parseFloat(row[8]);
        //   // If we charged them the cost for the part, it means it was included

        //   const itemWasIncluded = (cost && cost === chargedAmount);
        //   const multipleItemsIncluded = (cost && chargedAmount > cost);

        //   if (itemWasIncluded) {

        //     this.tileList.push(`(1) ${properEquipmentName}`);

        //   } else if (multipleItemsIncluded) {

        //     const quantity = this.determineQuantityOfItem(cost, chargedAmount);

        //     this.tileList.push(`(${quantity}) ${properEquipmentName}`);
        //   }
        // });


    }


}