import { WaterAndExtrasService } from './providers/water-and-extras.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkbookService } from 'src/app/shared/providers/workbook.service';

@Component({
  selector: 'vin-water-and-extras-section',
  templateUrl: './water-and-extras-section.component.html',
  styleUrls: ['./water-and-extras-section.component.css']
})
export class WaterAndExtrasSectionComponent implements OnInit {

  public waterAndExtraList: Array<string>;
  public fileUploaded: Subscription;

  constructor(
    private waterAndExtrasService: WaterAndExtrasService,
    private workbookService: WorkbookService
  ) {

    this.fileUploaded = this.workbookService.getWorkbookUpdatedObservable().subscribe(newVal => {
      this.waterAndExtraList = this.waterAndExtrasService.getWaterAndExtraDataFromSection();
    })
  }

  ngOnInit() {
  }

}
