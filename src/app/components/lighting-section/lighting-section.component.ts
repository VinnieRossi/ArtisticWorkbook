import { Component, OnInit } from '@angular/core';
import { LightingService } from './providers/lighting.service';

@Component({
  selector: 'vin-lighting-section',
  templateUrl: './lighting-section.component.html',
  styleUrls: ['./lighting-section.component.css']
})
export class LightingSectionComponent implements OnInit {

  public lightingList: Array<string>;

  constructor(
    private lightingService: LightingService
  ) {
  }

  ngOnInit() {

    this.lightingList = this.lightingService.getLightingDataFromSection();

  }
}
