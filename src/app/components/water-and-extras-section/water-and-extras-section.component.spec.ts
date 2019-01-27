import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterAndExtrasSectionComponent } from './water-and-extras-section.component';

describe('WaterAndExtrasSectionComponent', () => {
  let component: WaterAndExtrasSectionComponent;
  let fixture: ComponentFixture<WaterAndExtrasSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterAndExtrasSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterAndExtrasSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
