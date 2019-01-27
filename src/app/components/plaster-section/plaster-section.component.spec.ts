import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlasterSectionComponent } from './plaster-section.component';

describe('PlasterSectionComponent', () => {
  let component: PlasterSectionComponent;
  let fixture: ComponentFixture<PlasterSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlasterSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlasterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
