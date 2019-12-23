import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentQuestionDialogComponent } from './assignment-question-dialog.component';

describe('AssignmentQuestionDialogComponent', () => {
  let component: AssignmentQuestionDialogComponent;
  let fixture: ComponentFixture<AssignmentQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
