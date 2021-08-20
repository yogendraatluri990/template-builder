import { TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';

import { AuthFacade } from './auth-facade';

describe('AuthFacadeService', () => {
  let service: AuthFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot(), RouterTestingModule]
    });
    service = TestBed.inject(AuthFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
