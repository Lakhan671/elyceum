import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeTypeDialogComponent } from './fee-type-dialog.component';

describe('FeeTypeDialogComponent', () => {
  let component: FeeTypeDialogComponent;
  let fixture: ComponentFixture<FeeTypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeTypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
