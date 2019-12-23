import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessionCreateComponent } from './lession-create.component';

describe('LessionCreateComponent', () => {
  let component: LessionCreateComponent;
  let fixture: ComponentFixture<LessionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
