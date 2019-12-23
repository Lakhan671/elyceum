import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionStudentDialogComponent } from './section-student-dialog.component';

describe('SectionStudentDialogComponent', () => {
  let component: SectionStudentDialogComponent;
  let fixture: ComponentFixture<SectionStudentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionStudentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
