import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNumberQuestionComponent } from './list-number-question.component';

describe('ListNumberQuestionComponent', () => {
  let component: ListNumberQuestionComponent;
  let fixture: ComponentFixture<ListNumberQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNumberQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNumberQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
