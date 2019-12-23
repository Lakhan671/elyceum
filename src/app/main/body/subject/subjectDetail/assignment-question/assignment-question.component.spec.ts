import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentQuestionComponent } from './assignment-question.component';

describe('AssignmentQuestionComponent', () => {
  let component: AssignmentQuestionComponent;
  let fixture: ComponentFixture<AssignmentQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
