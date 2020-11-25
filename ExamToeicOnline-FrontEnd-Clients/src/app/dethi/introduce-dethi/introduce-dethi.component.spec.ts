import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroduceDethiComponent } from './introduce-dethi.component';

describe('IntroduceDethiComponent', () => {
  let component: IntroduceDethiComponent;
  let fixture: ComponentFixture<IntroduceDethiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroduceDethiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroduceDethiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
