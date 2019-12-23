import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAttachmentComponent } from './question-attachment.component';

describe('QuestionAttachmentComponent', () => {
  let component: QuestionAttachmentComponent;
  let fixture: ComponentFixture<QuestionAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
