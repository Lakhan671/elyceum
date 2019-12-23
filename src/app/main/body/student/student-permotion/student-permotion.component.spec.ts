import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPermotionComponent } from './student-permotion.component';

describe('StudentPermotionComponent', () => {
  let component: StudentPermotionComponent;
  let fixture: ComponentFixture<StudentPermotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPermotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPermotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
