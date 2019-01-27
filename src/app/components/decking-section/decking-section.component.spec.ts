import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckingSectionComponent } from './decking-section.component';

describe('DeckingSectionComponent', () => {
  let component: DeckingSectionComponent;
  let fixture: ComponentFixture<DeckingSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckingSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
