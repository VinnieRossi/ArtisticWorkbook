import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileSectionComponent } from './tile-section.component';

describe('TileSectionComponent', () => {
  let component: TileSectionComponent;
  let fixture: ComponentFixture<TileSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
