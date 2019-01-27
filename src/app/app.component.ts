import { WorkbookService } from './providers/workbook.service';
import { Component } from '@angular/core';

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

}