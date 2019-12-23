import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SutdentAddComponent } from './sutdent-add.component';

describe('SutdentAddComponent', () => {
  let component: SutdentAddComponent;
  let fixture: ComponentFixture<SutdentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SutdentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SutdentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
