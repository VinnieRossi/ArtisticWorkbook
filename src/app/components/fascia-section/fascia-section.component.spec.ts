import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FasciaSectionComponent } from './fascia-section.component';

describe('FasciaSectionComponent', () => {
  let component: FasciaSectionComponent;
  let fixture: ComponentFixture<FasciaSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FasciaSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FasciaSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
