import { Component, OnInit } from '@angular/core';
import { TileService } from './providers/tile.service';
import { Subscription } from 'rxjs';
import { WorkbookService } from 'src/app/shared/providers/workbook.service';

@Component({
  selector: 'vin-tile-section',
  templateUrl: './tile-section.component.html',
  styleUrls: ['./tile-section.component.css']
})
export class TileSectionComponent implements OnInit {

  public tileList: Array<string>;
  public fileUploaded: Subscription;

  constructor(
    private tileService: TileService,
    private workbookService: WorkbookService
  ) {

    this.fileUploaded = this.workbookService.getWorkbookUpdatedObservable().subscribe(newVal => {
      this.tileList = this.tileService.getTileDataFromSection();
    })
  }

  ngOnInit() {
  }

}
