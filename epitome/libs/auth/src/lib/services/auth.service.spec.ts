import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
import {
  AUTH_SERVICE_CONFIG,
  AuthServiceConfig,
  ENIVORNMENT_CONFIG,
} from '../types';

import { AuthServiceConfigMock } from '../mocks';


const mockLoginCredentials = {
  asi_number: 'test',
  UserName: 'test',
  Password: 'test',
  appCode: 'SITA',
  appVersion: '3.0.0',
  rememberMe: false
}
describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, HttpClientTestingModule],
      providers: [
        MatSnackBar,
        {
          provide: AUTH_SERVICE_CONFIG,
          useValue: AuthServiceConfigMock,
        },
        { provide: ENIVORNMENT_CONFIG, useValue: {} },
      ],
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  describe('login', () => {
    it('posts credentials to config url', inject([AuthService, HttpTestingController],
    (service: AuthService, http: HttpTestingController) => {
      service.login(mockLoginCredentials)
      const res = http.expectOne(
        `${AuthServiceConfigMock.Url}${AuthServiceConfigMock.tokenPath}`
      );
      res.flush('Post');
      expect(res.request.method).toBe('POST');
    }));
  })
});
