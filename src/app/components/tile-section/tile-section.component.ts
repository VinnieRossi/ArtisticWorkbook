import { Component, OnInit } from '@angular/core';
import { TileService } from './providers/tile.service';

@Component({
  selector: 'vin-tile-section',
  templateUrl: './tile-section.component.html',
  styleUrls: ['./tile-section.component.css']
})
export class TileSectionComponent implements OnInit {

  public tileList: Array<string>;

  constructor(
    private tileService: TileService
  ) {
  }

  ngOnInit() {

    this.tileList = this.tileService.getTileDataFromSection();

  }

}
