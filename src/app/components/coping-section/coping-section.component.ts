import { CopingService } from './providers/coping.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkbookService } from 'src/app/shared/providers/workbook.service';

@Component({
  selector: 'vin-coping-section',
  templateUrl: './coping-section.component.html',
  styleUrls: ['./coping-section.component.css']
})
export class CopingSectionComponent implements OnInit {

  public copingList: Array<string>;
  public fileUploaded: Subscription;

  constructor(
    private copingService: CopingService,
    private workbookService: WorkbookService
  ) {

    this.fileUploaded = this.workbookService.getWorkbookUpdatedObservable().subscribe(newVal => {
      this.copingList = this.copingService.getCopingDataFromSection();
    })
  }

  ngOnInit() {
  }

}
