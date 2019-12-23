import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessionReplyDialogComponent } from './lession-reply-dialog.component';

describe('LessionReplyDialogComponent', () => {
  let component: LessionReplyDialogComponent;
  let fixture: ComponentFixture<LessionReplyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessionReplyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessionReplyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
