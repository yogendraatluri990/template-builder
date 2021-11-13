import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxsModule } from '@ngxs/store';

import { AuthState } from './state';
import {
  AuthServiceConfig,
  AUTH_SERVICE_CONFIG,
  ENIVORNMENT_CONFIG,
} from '../../../types';

describe('AuthState', () => {
  let service: AuthState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        NgxsModule.forRoot(),
      ],
      providers: [
        MatSnackBar,
        {
          provide: AUTH_SERVICE_CONFIG,
          useClass: AuthServiceConfig,
        },
        { provide: ENIVORNMENT_CONFIG, useValue: {} },
      ],
    });
    service = TestBed.inject(AuthState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
