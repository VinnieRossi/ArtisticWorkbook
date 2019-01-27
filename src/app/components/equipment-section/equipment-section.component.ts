import { WorkbookService } from './../../providers/workbook.service';
import { EquipmentService } from './providers/equipment.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vin-equipment-section',
  templateUrl: './equipment-section.component.html',
  styleUrls: ['./equipment-section.component.css']
})
export class EquipmentSectionComponent implements OnInit {

  public equipmentList: Array<string>;

  private nameMap: Map<string, string> = new Map<string, string>();

  constructor(
    private equipmentService: EquipmentService,
    private workbookService: WorkbookService
  ) {

    this.nameMap = this.equipmentService.getNameMap();
  }

  ngOnInit() {

    const equipmentSectionData: Array<Array<string>> = this.workbookService.getEquipmentSection();

    this.equipmentList = this.equipmentService.getEquipmentDataFromSection(equipmentSectionData, this.nameMap);

  }
}
