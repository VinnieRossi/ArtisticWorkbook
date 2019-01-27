import { WaterAndExtrasService } from './providers/water-and-extras.service';
import { WorkbookService } from './../../providers/workbook.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vin-water-and-extras-section',
  templateUrl: './water-and-extras-section.component.html',
  styleUrls: ['./water-and-extras-section.component.css']
})
export class WaterAndExtrasSectionComponent implements OnInit {

  public waterAndExtraList: Array<string>;

  constructor(
    private workbookService: WorkbookService,
    private waterAndExtrasService: WaterAndExtrasService
  ) { }

  ngOnInit() {

    const waterAndExtraSectionData: Array<Array<string>> = this.workbookService.getWaterAndExtraSection();

    this.waterAndExtraList = this.waterAndExtrasService.getWaterAndExtraDataFromSection(waterAndExtraSectionData);

  }

}
