import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberQuestionDetailComponent } from './number-question-detail.component';

describe('NumberQuestionDetailComponent', () => {
  let component: NumberQuestionDetailComponent;
  let fixture: ComponentFixture<NumberQuestionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberQuestionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberQuestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
