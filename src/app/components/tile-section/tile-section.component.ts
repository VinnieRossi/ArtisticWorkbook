import { WorkbookService } from 'src/app/providers/workbook.service';
import { Component, OnInit } from '@angular/core';
import { TileService } from './providers/tile.service';

@Component({
  selector: 'vin-tile-section',
  templateUrl: './tile-section.component.html',
  styleUrls: ['./tile-section.component.css']
})
export class TileSectionComponent implements OnInit {

  public tileList: Array<string>;

  private nameMap: Map<string, string> = new Map<string, string>();

  constructor(
    private tileService: TileService,
    private workbookService: WorkbookService
  ) {

    this.nameMap = this.tileService.getNameMap();
  }

  ngOnInit() {

    const tileSectionData: Array<Array<string>> = this.workbookService.getTileSection();

    this.tileList = this.tileService.getTileDataFromSection(tileSectionData, this.nameMap);

  }

}
