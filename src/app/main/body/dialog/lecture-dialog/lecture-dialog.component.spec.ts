import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureDialogComponent } from './lecture-dialog.component';

describe('LectureDialogComponent', () => {
  let component: LectureDialogComponent;
  let fixture: ComponentFixture<LectureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
