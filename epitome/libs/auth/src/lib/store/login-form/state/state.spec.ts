import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NgxsModule, Store, Actions } from '@ngxs/store';
import { LoginFormState } from './state';
import { LoginFormStateMockModel } from '@auth/mocks/store/mock-login-form-state.mock';

describe('StateService', () => {
  let actions$;
  let http;
  let store;
  let state;
  let loginCredentials;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot([LoginFormState])],
      providers: [HttpClientTestingModule],
    });
    actions$ = TestBed.inject(Actions);
    http = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Store);
    state = LoginFormStateMockModel.state();
    store.reset({
      User: state,
    });
    loginCredentials = {
      asi_number: 'abc',
      username: 'abcd',
      password: 'abcde',
      app_group: '',
      app_code: 'SITA',
      app_verison: '3.0.0',
      kick: '1',
      invoke: '',
    };
  });

  it('creates a store', () => {
    expect(store).toBeTruthy();
  });
});
