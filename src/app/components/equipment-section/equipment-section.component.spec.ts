import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentSectionComponent } from './equipment-section.component';

describe('EquipmentSectionComponent', () => {
  let component: EquipmentSectionComponent;
  let fixture: ComponentFixture<EquipmentSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
