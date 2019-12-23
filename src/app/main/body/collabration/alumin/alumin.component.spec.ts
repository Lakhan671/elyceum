import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AluminComponent } from './alumin.component';

describe('AluminComponent', () => {
  let component: AluminComponent;
  let fixture: ComponentFixture<AluminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AluminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AluminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
