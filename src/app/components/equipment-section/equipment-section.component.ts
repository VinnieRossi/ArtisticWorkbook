
import { EquipmentService } from './providers/equipment.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vin-equipment-section',
  templateUrl: './equipment-section.component.html',
  styleUrls: ['./equipment-section.component.css']
})
export class EquipmentSectionComponent implements OnInit {

  public equipmentList: Array<string>;

  constructor(
    private equipmentService: EquipmentService
  ) {
  }

  ngOnInit() {

    this.equipmentList = this.equipmentService.getEquipmentDataFromSection();

  }
}
