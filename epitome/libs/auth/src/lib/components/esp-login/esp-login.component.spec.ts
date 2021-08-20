import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';

import { EspLoginComponent, EspLoginModule } from './esp-login.component';
import {
  AuthServiceConfig,
  AUTH_SERVICE_CONFIG,
  ENIVORNMENT_CONFIG,
} from '../../types';

describe('EspLoginComponent', () => {
  let component: EspLoginComponent;
  let fixture: ComponentFixture<EspLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EspLoginComponent],
      imports: [BrowserAnimationsModule, EspLoginModule, HttpClientTestingModule, NgxsModule.forRoot(), RouterTestingModule],
      providers: [
        {
          provide: AUTH_SERVICE_CONFIG,
          useClass: AuthServiceConfig,
        },
        { provide: ENIVORNMENT_CONFIG, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
