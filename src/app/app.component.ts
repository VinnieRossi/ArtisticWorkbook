import { WorkbookService } from './providers/workbook.service';
import { Component } from '@angular/core';
import { FasciaService } from './components/fascia-section/providers/fascia.service';

import readXlsxFile from 'read-excel-file'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  waterAndExtraInformation: Array<Array<string>>;
  waterAndExtraList: Array<string> = [];

  fasciaInformation: Array<Array<string>>;
  fasciaList: Array<string> = []

  deckingInformation: Array<Array<string>>;
  deckingList: Array<string> = []

  plasterInformation: Array<Array<string>>;
  plasterList: Array<string> = []

  constructor(
    private workbookService: WorkbookService,
    private fasciaService: FasciaService,

  ) {

  }

  readFile(event: any): any {

    const selectedFile = event.target.files[0];

    readXlsxFile(selectedFile, { sheet: 1 }).then(rows => {

      this.workbookService.setRawWorkbookData(rows);
    });

  }

  public shouldDisplayWorkbookSections(): boolean {

    const workBookDataLoaded: boolean = !!this.workbookService.getRawWorkbookData();

    return workBookDataLoaded;
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

}
