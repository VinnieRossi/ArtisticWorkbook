import { WaterAndExtrasService } from './providers/water-and-extras.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vin-water-and-extras-section',
  templateUrl: './water-and-extras-section.component.html',
  styleUrls: ['./water-and-extras-section.component.css']
})
export class WaterAndExtrasSectionComponent implements OnInit {

  public waterAndExtraList: Array<string>;

  constructor(
    private waterAndExtrasService: WaterAndExtrasService
  ) { }

  ngOnInit() {

    this.waterAndExtraList = this.waterAndExtrasService.getWaterAndExtraDataFromSection();

  }

}
