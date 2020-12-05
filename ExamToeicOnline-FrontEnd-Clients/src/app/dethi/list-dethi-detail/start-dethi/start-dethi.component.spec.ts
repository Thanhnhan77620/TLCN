import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartDethiComponent } from './start-dethi.component';

describe('StartDethiComponent', () => {
  let component: StartDethiComponent;
  let fixture: ComponentFixture<StartDethiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartDethiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartDethiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
