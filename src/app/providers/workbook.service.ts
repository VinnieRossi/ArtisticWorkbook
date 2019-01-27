import { TileService } from '../components/tile-section/providers/tile.service';
import { WaterAndExtrasService } from '../components/water-and-extras-section/providers/water-and-extras.service';
import { Injectable } from "@angular/core";
import { EquipmentService } from "../components/equipment-section/providers/equipment.service";
import { CopingService } from "../components/coping-section/providers/coping.service";
import { LightingService } from "../components/lighting-section/providers/lighting.service";
import { FasciaService } from "../components/fascia-section/providers/fascia.service";

@Injectable({
    providedIn: 'root',
})
export class WorkbookService {

    private masterNameMap: Map<string, string> = new Map<string, string>();
    private ignoreSet: Set<string> = new Set<string>();
    private rawWorkbookData: Array<Array<string>>;

    constructor(
        // private equipmentService: EquipmentService,
        private copingService: CopingService,
        private lightingService: LightingService,
        private fasciaService: FasciaService,
        private waterAndExtrasService: WaterAndExtrasService,
        private tileService: TileService
    ) {

        this.createGlobalIgnoreSet();

        // const equipmentNameMap: Map<string, string> = this.equipmentService.getNameMap();

        const copingNameMap: Map<string, string> = this.copingService.getNameMap();

        const lightingNameMap: Map<string, string> = this.lightingService.getNameMap();

        const fasciaNameMap: Map<string, string> = this.fasciaService.getNameMap();

        // Object.assign(this.masterNameMap, equipmentNameMap, copingNameMap, lightingNameMap, fasciaNameMap);

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

    public setRawWorkbookData(rawWorkbookData: Array<Array<string>>): void {

        this.rawWorkbookData = rawWorkbookData;
    }

    public getRawWorkbookData(): Array<Array<string>> {

        return this.rawWorkbookData;
    }

    public getBestGuessName(row: Array<string>): string {

        const probableName = row[2] ? row[2] : row[3];

        const mappedName = this.masterNameMap.get(probableName);

        const properName = mappedName ? mappedName : probableName;

        return properName;
    }

    public retrieveAllDefaultEntries(): Array<string> {

        // const equipmentDefaultValues: Array<string> = this.equipmentService.getDefaultEntries();

        // return [...equipmentDefaultValues];
        return [];
    }

    public createWorkbookSectionsInServices(): void {

        // this.createEquipmentSection();

        this.createLightingSection();

        this.createWaterAndExtraSection();

        this.createCopingSection();

        this.createFasciaSection();

        this.createTileSection();

    }

    public getEquipmentSection(): Array<Array<string>> {

        // The lighting information is found within the larger equipment information, although it has its' own section in the quote
        const equipmentSection: Array<Array<string>> = [...this.rawWorkbookData.slice(190, 251), ...this.rawWorkbookData.slice(274, 322)];

        return equipmentSection;
    }

    private createLightingSection(): void {

        const lightingSection: Array<Array<string>> = this.rawWorkbookData.slice(251, 274);

        this.lightingService.setSection(lightingSection);
    }

    private createWaterAndExtraSection(): void {

        const waterAndExtraSection: Array<Array<string>> = this.rawWorkbookData.slice(322, 340);

        this.waterAndExtrasService.setSection(waterAndExtraSection);
    }

    private createCopingSection(): void {

        const copingSection: Array<Array<string>> = this.rawWorkbookData.slice(340, 384);

        this.copingService.setSection(copingSection);
    }

    private createFasciaSection(): void {

        const fasciaSection: Array<Array<string>> = this.rawWorkbookData.slice(384, 398);

        this.fasciaService.setSection(fasciaSection);
    }

    private createTileSection(): void {

        const tileSection: Array<Array<string>> = this.rawWorkbookData.slice(398, 418);

        this.tileService.setSection(tileSection);
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