import { WorkbookService } from './../../providers/workbook.service';
import { EquipmentService } from './providers/equipment.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vin-equipment-section',
  templateUrl: './equipment-section.component.html',
  styleUrls: ['./equipment-section.component.css']
})
export class EquipmentSectionComponent implements OnInit {

  private nameMap: Map<string, string> = new Map<string, string>();
  private equipmentList: Array<string> = [];

  constructor(
    private equipmentService: EquipmentService,
    private workbookService: WorkbookService
  ) {

    this.nameMap = this.equipmentService.getNameMap();
  }

  ngOnInit() {

    const equipmentSectionData: Array<Array<string>> = this.workbookService.getEquipmentSection();

    this.equipmentList = this.equipmentService.getEquipmentDataFromSection(equipmentSectionData);

  }

  public getEquipmentName(row: Array<string>): string {

    const probableName = this.equipmentService.getEquipmentName(row);

    const mappedName = this.nameMap.get(probableName);

    const properName = mappedName ? mappedName : probableName;

    return properName;
  }



}
