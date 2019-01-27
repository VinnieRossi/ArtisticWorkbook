import { WorkbookService } from 'src/app/shared/providers/workbook.service';

import { EquipmentService } from './providers/equipment.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'vin-equipment-section',
  templateUrl: './equipment-section.component.html',
  styleUrls: ['./equipment-section.component.css']
})
export class EquipmentSectionComponent implements OnInit, OnDestroy {

  public equipmentList: Array<string>;
  public fileUploaded: Subscription;

  constructor(
    private equipmentService: EquipmentService,
    private workbookService: WorkbookService
  ) {

    this.fileUploaded = this.workbookService.getWorkbookUpdatedObservable().subscribe(newVal => {
      this.equipmentList = this.equipmentService.getEquipmentDataFromSection();
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.fileUploaded.unsubscribe();
  }
}
