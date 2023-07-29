import { TestBed } from '@angular/core/testing';

import { RevisarSesionGuard } from './revisar-sesion.guard';

describe('RevisarSesionGuard', () => {
  let guard: RevisarSesionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RevisarSesionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
