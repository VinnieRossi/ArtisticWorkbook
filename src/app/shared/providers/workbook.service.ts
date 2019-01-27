import { Injectable } from "@angular/core";
import { Observable, from, Subject } from "rxjs";
import readXlsxFile from 'read-excel-file'


@Injectable({
    providedIn: 'root',
})
export class WorkbookService {

    private ignoreSet: Set<string> = new Set<string>();

    private rawWorkbookData: Array<Array<string>>;

    public workbookDataUploaded$: Subject<Array<Array<string>>> = new Subject();

    constructor(
    ) {

        this.createGlobalIgnoreSet();
    }

    public determineRowQuantity(cost: number, chargedAmount: number): number {

        const mod = Math.abs(chargedAmount % cost);

        if (mod !== 0 && mod > 1) {
            console.log(`Item found with improper cost/charge: Cost: ${cost}, Charged: ${chargedAmount}, Leftover Amount: ${mod}`);
        }

        const amount: number = mod === 0 ? chargedAmount / cost : Math.floor(chargedAmount / cost);

        return amount;

    }

    public getGlobalIgnoreSet(): Set<string> {
        return this.ignoreSet;
    }

    public async setRawWorkbookData(selectedFile: any): Promise<void> {

        const workbookData: Array<Array<string>> = await readXlsxFile(selectedFile, { sheet: 1 });

        this.rawWorkbookData = workbookData;

        this.workbookDataUploaded$.next(workbookData);

    }

    public getWorkbookUpdatedObservable(): Subject<any> {
        return this.workbookDataUploaded$;
    }

    public getRawWorkbookData(): Array<Array<string>> {

        return this.rawWorkbookData;
    }

    public getBestGuessName(row: Array<string>, nameMap?: Map<string, string>): string {

        const probableName = row[2] ? row[2] : row[3];

        if (nameMap) {
            const mappedName = nameMap.get(probableName);

            const properName = mappedName ? mappedName : probableName;

            return properName;
        }

        return probableName;
    }

    public getEquipmentSection(): Array<Array<string>> {

        // The lighting information is found within the larger equipment information, although it has its' own section in the quote
        const equipmentSection: Array<Array<string>> = [...this.rawWorkbookData.slice(190, 251), ...this.rawWorkbookData.slice(274, 322)];

        return equipmentSection;
    }

    public getLightingSection(): Array<Array<string>> {

        const lightingSection: Array<Array<string>> = this.rawWorkbookData.slice(251, 274);

        return lightingSection;
    }

    public getWaterAndExtraSection(): Array<Array<string>> {

        const waterAndExtraSection: Array<Array<string>> = this.rawWorkbookData.slice(322, 340);

        return waterAndExtraSection;
    }

    public getCopingSection(): Array<Array<string>> {

        const copingSection: Array<Array<string>> = this.rawWorkbookData.slice(340, 384);

        return copingSection;
    }

    public getFasciaSection(): Array<Array<string>> {

        const fasciaSection: Array<Array<string>> = this.rawWorkbookData.slice(384, 398);

        return fasciaSection;
    }

    public getTileSection(): Array<Array<string>> {

        const tileSection: Array<Array<string>> = this.rawWorkbookData.slice(398, 418);

        return tileSection;
    }

    // Make this section-based once I get more info
    private createGlobalIgnoreSet(): void {
        // this.ignoreSet.add('Labor installation');
        this.ignoreSet.add('Part (Pool ONLY)');
        this.ignoreSet.add('Energy Bowl');
        this.ignoreSet.add('Shipping');
        this.ignoreSet.add('12"x18" DBL BULL'); //?
    }


}

// Pool Equipment
// Pumps
// Booster pump
// Filters
// Heat Pumps
// Heaters
// Controls/Automation
// Sanitation System
// Mechanical Timer
// Lighting (subsection)
// Valves
// Automatic CLeaner
// Auto Fill [RPZ Flag lives here]
// Air BLower
// Start-up kit
// Additional Items (subsection extras)
// 56

// Coping [LN 413-473]

// Tile [LN 502-516]

// Lighting [LN 307-338]

// Fascia [LN 474-501]

// Decking {SHEET 3} [LN 11-25]

// Plaster {SHEET 2} [LN 85-200?]

// Extras [LN 390-412]

// Electric Services - Always the same?
// Start up and chemicals - Always the same?.