import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DethiDetailComponent } from './dethi-detail.component';

describe('DethiDetailComponent', () => {
  let component: DethiDetailComponent;
  let fixture: ComponentFixture<DethiDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DethiDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DethiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
