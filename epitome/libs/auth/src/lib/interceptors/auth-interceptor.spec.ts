import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxsModule } from '@ngxs/store';

import { AuthInterceptor } from './auth-interceptor';
import { ENIVORNMENT_CONFIG } from '../types';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, NgxsModule.forRoot(), RouterTestingModule],
      providers: [MatSnackBar, { provide: ENIVORNMENT_CONFIG, useValue: {} }],
    });
    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
