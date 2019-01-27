import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopingSectionComponent } from './coping-section.component';

describe('CopingSectionComponent', () => {
  let component: CopingSectionComponent;
  let fixture: ComponentFixture<CopingSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopingSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
