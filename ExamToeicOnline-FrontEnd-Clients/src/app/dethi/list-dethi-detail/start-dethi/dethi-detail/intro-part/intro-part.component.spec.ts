import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroPartComponent } from './intro-part.component';

describe('IntroPartComponent', () => {
  let component: IntroPartComponent;
  let fixture: ComponentFixture<IntroPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
