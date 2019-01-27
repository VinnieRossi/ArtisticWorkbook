import { Component, OnInit } from '@angular/core';
import { LightingService } from './providers/lighting.service';
import { WorkbookService } from 'src/app/providers/workbook.service';

@Component({
  selector: 'vin-lighting-section',
  templateUrl: './lighting-section.component.html',
  styleUrls: ['./lighting-section.component.css']
})
export class LightingSectionComponent implements OnInit {

  public lightingList: Array<string>;

  constructor(
    private lightingService: LightingService,
    private workbookService: WorkbookService
  ) {
  }

  ngOnInit() {

    const equipmentSectionData: Array<Array<string>> = this.workbookService.getLightingSection();

    this.lightingList = this.lightingService.getLightingDataFromSection(equipmentSectionData);

  }
}
