import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermotionDialogComponent } from './permotion-dialog.component';

describe('PermotionDialogComponent', () => {
  let component: PermotionDialogComponent;
  let fixture: ComponentFixture<PermotionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermotionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermotionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
