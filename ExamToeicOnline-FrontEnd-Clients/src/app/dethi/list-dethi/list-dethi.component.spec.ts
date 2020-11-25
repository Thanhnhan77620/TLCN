import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDethiComponent } from './list-dethi.component';

describe('ListDethiComponent', () => {
  let component: ListDethiComponent;
  let fixture: ComponentFixture<ListDethiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDethiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDethiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
