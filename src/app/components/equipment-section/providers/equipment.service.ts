import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class EquipmentService {

    private dataSection: Array<Array<string>> = new Array<Array<string>>();
    private nameMap: Map<string, string> = new Map<string, string>();

    constructor() {

        this.nameMap.set(`Polaris 360 Head only`, `Polaris 360 automatic pool cleaner with Jandy energy bowl filter`);
        this.nameMap.set(`Sheer decents 4 ft`, `4' long Sheer descent to be installed in center of raised beam wall`);
        this.nameMap.set(`Labor installation`, `Installation of Autofill and Drain. 
        (Schedule 40 PVC water supply line stubbed out of house below grade by others. 
          Sub out is reuqired to meet all building codes and contain installation of backflow device, if necessary, to meet code.)`);
        this.nameMap.set(`3'x8' concrete pad`, `3’ X 8’ concrete equipment pad for equipment set.`);
        this.nameMap.set(`Hayward Skimmer SP1070 & Pressure test kit`, `Skimmer(s)`);

    }

    public getEquipmentName(row: Array<string>): string {

        const probableName = row[2] ? row[2] : row[3];

        const mappedName = this.nameMap.get(probableName);

        const properName = mappedName ? mappedName : probableName;

        return properName;
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

    public getDefaultEntries(): Array<string> {

        // These values seem to always in this section
        const defaultEntries: Array<string> = ['Start-up balancing chemicals for pool'];

        return defaultEntries;
    }
}