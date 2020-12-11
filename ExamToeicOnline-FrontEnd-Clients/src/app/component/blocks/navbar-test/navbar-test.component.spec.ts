import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTestComponent } from './navbar-test.component';

describe('NavbarTestComponent', () => {
  let component: NavbarTestComponent;
  let fixture: ComponentFixture<NavbarTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
