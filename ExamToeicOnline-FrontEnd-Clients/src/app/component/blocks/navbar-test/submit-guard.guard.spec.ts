import { TestBed } from '@angular/core/testing';

import { SubmitGuardGuard } from './submit-guard.guard';

describe('SubmitGuardGuard', () => {
  let guard: SubmitGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SubmitGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
