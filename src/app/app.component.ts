import { WorkbookService } from './providers/workbook.service';
import { CopingService } from './components/coping-section/providers/coping.service';
import { Component } from '@angular/core';

import { EquipmentService } from './components/equipment-section/providers/equipment.service';
import { FasciaService } from './components/fascia-section/providers/fascia.service';

import readXlsxFile from 'read-excel-file'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private title: string = 'Artistic Workbook Helper';

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

  }

  readFile(event: any): any {

    const selectedFile = event.target.files[0];

    readXlsxFile(selectedFile, { sheet: 1 }).then(rows => {

      this.workbookService.setRawWorkbookData(rows);

      // this.rawWorkbookData = rows;

      this.getEquipmentList();
    });

  }

  public shouldDisplayWorkbookSections(): boolean {

    if (this.workbookService.getRawWorkbookData()) { return true; }

    return false;
  }

  private getEquipmentList(): void {

    if (!this.workbookService.getRawWorkbookData()) { return; }

    this.populateAllLists();

  }

  private populateAllLists() {

    // this.populateLightingList();

    // this.populateWaterAndExtraList();

    // // this.populateCopingList();

    // this.populateFasciaList()

    // this.populateTileList()

    // Page 2
    // this.populatePlasterList();

    // Page 3
    // this.populateDeckingList();
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





}
