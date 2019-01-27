import { CopingService } from './providers/coping.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vin-coping-section',
  templateUrl: './coping-section.component.html',
  styleUrls: ['./coping-section.component.css']
})
export class CopingSectionComponent implements OnInit {

  public copingList: Array<string>;

  constructor(
    private copingService: CopingService
  ) {
  }

  ngOnInit() {

    this.copingList = this.copingService.getCopingDataFromSection();

  }

}
