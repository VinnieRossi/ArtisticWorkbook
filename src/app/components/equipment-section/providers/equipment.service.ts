
import { Injectable } from "@angular/core";
import { WorkbookService } from "src/app/shared/providers/workbook.service";

@Injectable({
    providedIn: 'root',
})
export class EquipmentService {

    constructor(
        private workbookService: WorkbookService
    ) {

    }

    public getNameMap(): Map<string, string> {

        const nameMap: Map<string, string> = new Map<string, string>();

        nameMap.set(`Polaris 360 Head only`, `Polaris 360 automatic pool cleaner with Jandy energy bowl filter`);
        nameMap.set(`Sheer decents 4 ft`, `4' long Sheer descent to be installed in center of raised beam wall`);
        nameMap.set(`Labor installation`, `Installation of Autofill and Drain. 
        (Schedule 40 PVC water supply line stubbed out of house below grade by others. 
          Sub out is reuqired to meet all building codes and contain installation of backflow device, if necessary, to meet code.)`);
        nameMap.set(`3'x8' concrete pad`, `3’ X 8’ concrete equipment pad for equipment set.`);
        nameMap.set(`Hayward Skimmer SP1070 & Pressure test kit`, `Skimmer(s)`);

        return nameMap;
    }

    public getDefaultEntries(): Array<string> {

        // These values seem to always in this section
        const defaultEntries: Array<string> = ['Start-up balancing chemicals for pool'];

        return defaultEntries;
    }

    public getEquipmentDataFromSection(equipmentIgnoreSet?: Set<string>): Array<string> {

        const equipmentSectionData: Array<Array<string>> = this.workbookService.getEquipmentSection();

        const equipmentList: Array<string> = [];

        const defaultEquipmentListEntries: Array<string> = this.getDefaultEntries();

        const ignoreSet: Set<string> = this.workbookService.getGlobalIgnoreSet();

        equipmentSectionData.forEach((row, index) => {

            const properEquipmentName = this.getEquipmentName(row);

            if (ignoreSet.has(properEquipmentName)) { return; }

            const cost = parseFloat(row[7]);
            const chargedAmount = parseFloat(row[8]);

            // If we charged them the cost for the part, it means it was included
            const itemWasIncluded = (cost && cost === chargedAmount);
            const multipleItemsIncluded = (cost && chargedAmount > cost)

            if (itemWasIncluded) {

                equipmentList.push(`(1) ${properEquipmentName}`);

            } else if (multipleItemsIncluded) {

                const quantity = this.workbookService.determineRowQuantity(cost, chargedAmount);

                equipmentList.push(`(${quantity}) ${properEquipmentName}`);
            }

        });

        // if ()
        equipmentList.push('Does not include RPZ');

        equipmentList.push(...defaultEquipmentListEntries);

        return equipmentList;

    }

    private getEquipmentName(row: Array<string>): string {

        const nameMap: Map<string, string> = this.getNameMap()

        const probableName = row[2] ? row[2] : row[3];

        const mappedName = nameMap.get(probableName);

        const properName = mappedName ? mappedName : probableName;

        return properName;
    }
}