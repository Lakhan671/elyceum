import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTypeDialogComponent } from './calendar-type-dialog.component';

describe('CalendarTypeDialogComponent', () => {
  let component: CalendarTypeDialogComponent;
  let fixture: ComponentFixture<CalendarTypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarTypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
