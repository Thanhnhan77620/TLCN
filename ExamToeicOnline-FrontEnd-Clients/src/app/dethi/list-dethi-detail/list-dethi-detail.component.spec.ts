import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDethiDetailComponent } from './list-dethi-detail.component';

describe('ListDethiDetailComponent', () => {
  let component: ListDethiDetailComponent;
  let fixture: ComponentFixture<ListDethiDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDethiDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDethiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
