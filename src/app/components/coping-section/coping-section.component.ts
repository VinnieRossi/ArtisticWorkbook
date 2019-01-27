import { CopingService } from './providers/coping.service';
import { Component, OnInit } from '@angular/core';
import { WorkbookService } from 'src/app/providers/workbook.service';

@Component({
  selector: 'vin-coping-section',
  templateUrl: './coping-section.component.html',
  styleUrls: ['./coping-section.component.css']
})
export class CopingSectionComponent implements OnInit {

  public copingList: Array<string>;

  constructor(
    private copingService: CopingService,
    private workbookService: WorkbookService
  ) {
  }

  ngOnInit() {

    const copingSectionData: Array<Array<string>> = this.workbookService.getCopingSection();

    this.copingList = this.copingService.getCopingDataFromSection(copingSectionData);

  }

}
