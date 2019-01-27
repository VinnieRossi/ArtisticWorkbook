import { Component, OnInit } from '@angular/core';
import { FasciaService } from './providers/fascia.service';
import { Subscription } from 'rxjs';
import { WorkbookService } from 'src/app/shared/providers/workbook.service';

@Component({
  selector: 'vin-fascia-section',
  templateUrl: './fascia-section.component.html',
  styleUrls: ['./fascia-section.component.css']
})
export class FasciaSectionComponent implements OnInit {

  public fasciaList: Array<string>;
  public fileUploaded: Subscription;

  constructor(
    private fasciaService: FasciaService,
    private workbookService: WorkbookService
  ) {

    this.fileUploaded = this.workbookService.getWorkbookUpdatedObservable().subscribe(newVal => {
      this.fasciaList = this.fasciaService.getFasciaDataFromSection();
    })
  }

  ngOnInit() {
  }

}
