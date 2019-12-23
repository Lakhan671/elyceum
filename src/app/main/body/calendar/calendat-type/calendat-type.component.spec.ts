import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendatTypeComponent } from './calendat-type.component';

describe('CalendatTypeComponent', () => {
  let component: CalendatTypeComponent;
  let fixture: ComponentFixture<CalendatTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendatTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendatTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
