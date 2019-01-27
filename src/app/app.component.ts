import { WorkbookService } from './providers/workbook.service';
import { CopingService } from './components/coping-section/providers/coping.service';
import { Component } from '@angular/core';

import { EquipmentService } from './components/equipment-section/providers/equipment.service';
import { LightingService } from './components/lighting-section/providers/lighting.service';
import { FasciaService } from './components/fascia-section/providers/fascia.service';

import readXlsxFile from 'read-excel-file'
import { WaterAndExtrasService } from './providers/water-and-extras.service';
import { TileService } from './providers/tile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Artistic Workbook Helper';

  // rawWorkbookData: Array<Array<string>>;

  equipmentInformation: Array<Array<string>>;
  equipmentList: Array<string> = [];

  lightingInformation: Array<Array<string>>;
  lightingList: Array<string> = [];

  waterAndExtraInformation: Array<Array<string>>;
  waterAndExtraList: Array<string> = [];

  copingInformation: Array<Array<string>>;
  copingList: Array<string> = []

  fasciaInformation: Array<Array<string>>;
  fasciaList: Array<string> = []

  tileInformation: Array<Array<string>>;
  tileList: Array<string> = []

  deckingInformation: Array<Array<string>>;
  deckingList: Array<string> = []

  plasterInformation: Array<Array<string>>;
  plasterList: Array<string> = []


  // nameMap: Map<string, string>;
  ignoreSet: Set<String> = new Set<string>();

  constructor(
    private equipmentService: EquipmentService,
    private workbookService: WorkbookService,
    private fasciaService: FasciaService,
    private copingService: CopingService

  ) {
    this.createIgnoreSet();
  }

  readFile(event: any): any {

    const selectedFile = event.target.files[0];

    readXlsxFile(selectedFile, { sheet: 1 }).then(rows => {

      this.workbookService.setRawWorkbookData(rows);

      // this.rawWorkbookData = rows;

      this.getEquipmentList();
    });

  }

  private getEquipmentList(): void {

    if (!this.workbookService.getRawWorkbookData()) { return; }

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
    // Start up and chemicals - Always the same?

    this.workbookService.createWorkbookSectionsInServices();

    this.workbookService.retrieveAllDefaultEntries(); // Add these to the proper list

    this.populateAllLists();

  }

  private populateAllLists() {

    this.populateEquipmentList();

    this.populateLightingList();

    this.populateWaterAndExtraList();

    this.populateCopingList();

    this.populateFasciaList()

    this.populateTileList()

    // Page 2
    // this.populatePlasterList();

    // Page 3
    // this.populateDeckingList();
  }

  private populateEquipmentList(): void {

    this.equipmentInformation.forEach((row, index) => {

      const properEquipmentName = this.equipmentService.getEquipmentName(row);

      if (this.ignoreSet.has(properEquipmentName)) { return; }

      const cost = parseFloat(row[7]);
      const chargedAmount = parseFloat(row[8]);

      // If we charged them the cost for the part, it means it was included
      const itemWasIncluded = (cost && cost === chargedAmount);
      const multipleItemsIncluded = (cost && chargedAmount > cost)

      if (itemWasIncluded) {

        this.equipmentList.push(`(1) ${properEquipmentName}`);

      } else if (multipleItemsIncluded) {

        const quantity = this.workbookService.determineRowQuantity(cost, chargedAmount);

        this.equipmentList.push(`(${quantity}) ${properEquipmentName}`);
      }

    });

    // if ()
    this.equipmentList.push('Does not include RPZ');

  }

  private populateLightingList(): void {

    this.lightingInformation.forEach((row, index) => {

      const properEquipmentName = this.workbookService.getBestGuessName(row);

      if (this.ignoreSet.has(properEquipmentName)) { return; }

      const cost = parseFloat(row[7]);
      const chargedAmount = parseFloat(row[8]);

      // If we charged them the cost for the part, it means it was included
      const itemWasIncluded = (cost && cost === chargedAmount);
      const multipleItemsIncluded = (cost && chargedAmount > cost)

      if (itemWasIncluded) {

        this.lightingList.push(`(1) ${properEquipmentName}`);

      } else if (multipleItemsIncluded) {

        const quantity = this.workbookService.determineRowQuantity(cost, chargedAmount);

        this.lightingList.push(`(${quantity}) ${properEquipmentName}`);
      }

    });

    // this.lightingList.push(`Installation of electrical junction boxes.`);

  }

  private populateWaterAndExtraList(): void {

    this.waterAndExtraInformation.forEach(row => {

      const properEquipmentName = this.workbookService.getBestGuessName(row);

      if (this.ignoreSet.has(properEquipmentName)) { return; }

      const cost = parseFloat(row[6]);
      const chargedAmount = parseFloat(row[8]);
      // If we charged them the cost for the part, it means it was included

      const itemWasIncluded = (cost && cost === chargedAmount);
      const multipleItemsIncluded = (cost && chargedAmount > cost);

      if (itemWasIncluded) {

        this.waterAndExtraList.push(`(1) ${properEquipmentName}`);

      } else if (multipleItemsIncluded) {

        const quantity = this.workbookService.determineRowQuantity(cost, chargedAmount);

        this.waterAndExtraList.push(`(${quantity}) ${properEquipmentName}`);
      }
    });
  }

  private populateCopingList(): void {

    this.copingInformation.forEach(row => {
      const properCopingName = this.copingService.getCopingName(row);
      if (this.ignoreSet.has(properCopingName)) {
        return;
      }
      const cost = parseFloat(row[8]);
      const itemWasIncluded = (cost);
      if (properCopingName && itemWasIncluded) {
        this.copingList.push(properCopingName);
      }
    });
  }

  private populateFasciaList(): void {
    this.fasciaInformation.forEach(row => {

      const properEquipmentName = this.fasciaService.getFasciaName(row);

      if (this.ignoreSet.has(properEquipmentName)) { return; }

      const cost = parseFloat(row[6]);
      const chargedAmount = parseFloat(row[8]);
      // If we charged them the cost for the part, it means it was included

      const itemWasIncluded = (cost && cost === chargedAmount);
      const multipleItemsIncluded = (cost && chargedAmount > cost);

      if (itemWasIncluded) {

        this.fasciaList.push(`${properEquipmentName}`);

      } else if (multipleItemsIncluded) {

        const quantity = this.workbookService.determineRowQuantity(cost, chargedAmount);

        this.fasciaList.push(`Raised wall to be faced with (${quantity}) SF of ${properEquipmentName}`);
      }
    });
  }

  private populateTileList(): void {

    const tileLaborCost = parseFloat((this.tileInformation[11])[6]);

    const tileInformationText = `Installation of 6” x 6” pool tile`;

    const tileLaborText = `Includes tile cost of up to $${tileLaborCost}/SF`;

    this.tileList = [tileInformationText, tileLaborText];

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

  private createIgnoreSet(): void {
    // this.ignoreSet.add('Labor installation');
    this.ignoreSet.add('Part (Pool ONLY)');
    this.ignoreSet.add('Energy Bowl');
    this.ignoreSet.add('Shipping');
    this.ignoreSet.add('12"x18" DBL BULL'); //?
  }

}
