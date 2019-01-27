import { Component, OnInit } from '@angular/core';
import { FasciaService } from './providers/fascia.service';
import { WorkbookService } from 'src/app/providers/workbook.service';

@Component({
  selector: 'vin-fascia-section',
  templateUrl: './fascia-section.component.html',
  styleUrls: ['./fascia-section.component.css']
})
export class FasciaSectionComponent implements OnInit {

  public fasciaList: Array<string>;

  constructor(
    private fasciaService: FasciaService,
    private workbookService: WorkbookService
  ) {
  }

  ngOnInit() {

    const fasciaSectionData: Array<Array<string>> = this.workbookService.getFasciaSection();

    this.fasciaList = this.fasciaService.getFasciaDataFromSection(fasciaSectionData);

  }

}
