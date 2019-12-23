import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewdialogComponent } from './previewdialog.component';

describe('PreviewdialogComponent', () => {
  let component: PreviewdialogComponent;
  let fixture: ComponentFixture<PreviewdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
