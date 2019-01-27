import { Component, OnInit } from '@angular/core';
import { FasciaService } from './providers/fascia.service';

@Component({
  selector: 'vin-fascia-section',
  templateUrl: './fascia-section.component.html',
  styleUrls: ['./fascia-section.component.css']
})
export class FasciaSectionComponent implements OnInit {

  public fasciaList: Array<string>;

  constructor(
    private fasciaService: FasciaService
  ) {
  }

  ngOnInit() {

    this.fasciaList = this.fasciaService.getFasciaDataFromSection();

  }

}
