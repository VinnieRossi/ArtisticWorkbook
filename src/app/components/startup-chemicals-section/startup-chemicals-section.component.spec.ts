import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupChemicalsSectionComponent } from './startup-chemicals-section.component';

describe('StartupChemicalsSectionComponent', () => {
  let component: StartupChemicalsSectionComponent;
  let fixture: ComponentFixture<StartupChemicalsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartupChemicalsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupChemicalsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
