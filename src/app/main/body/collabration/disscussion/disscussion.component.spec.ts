import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisscussionComponent } from './disscussion.component';

describe('DisscussionComponent', () => {
  let component: DisscussionComponent;
  let fixture: ComponentFixture<DisscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
