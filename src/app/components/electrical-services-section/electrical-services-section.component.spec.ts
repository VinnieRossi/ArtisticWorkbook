import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricalServicesSectionComponent } from './electrical-services-section.component';

describe('ElectricalServicesSectionComponent', () => {
  let component: ElectricalServicesSectionComponent;
  let fixture: ComponentFixture<ElectricalServicesSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricalServicesSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricalServicesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
