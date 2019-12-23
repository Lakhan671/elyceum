import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemisterDialogComponent } from './semister-dialog.component';

describe('SemisterDialogComponent', () => {
  let component: SemisterDialogComponent;
  let fixture: ComponentFixture<SemisterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemisterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
