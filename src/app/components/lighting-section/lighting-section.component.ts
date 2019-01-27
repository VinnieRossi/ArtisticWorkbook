import { Component, OnInit } from '@angular/core';
import { LightingService } from './providers/lighting.service';
import { Subscription } from 'rxjs';
import { WorkbookService } from 'src/app/shared/providers/workbook.service';

@Component({
  selector: 'vin-lighting-section',
  templateUrl: './lighting-section.component.html',
  styleUrls: ['./lighting-section.component.css']
})
export class LightingSectionComponent implements OnInit {

  public fileUploaded: Subscription;
  public lightingList: Array<string>;

  constructor(
    private lightingService: LightingService,
    private workbookService: WorkbookService
  ) {

    this.fileUploaded = this.workbookService.getWorkbookUpdatedObservable().subscribe(newVal => {
      this.lightingList = this.lightingService.getLightingDataFromSection();
    })
  }

  ngOnInit() {
  }
}
