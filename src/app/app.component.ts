import { Component } from '@angular/core';
import { WorkbookService } from './shared/providers/workbook.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(
    private workbookService: WorkbookService,
  ) {
  }

  readFile(event: any): any {

    const selectedFile = event.target.files[0];

    this.workbookService.setRawWorkbookData(selectedFile);

  }

  public shouldDisplayWorkbookSections(): boolean {

    const workBookDataLoaded: boolean = !!this.workbookService.getRawWorkbookData();

    return workBookDataLoaded;
  }

}