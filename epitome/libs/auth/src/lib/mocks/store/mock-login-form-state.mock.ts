import * as faker from 'faker/locale/en_US';
import {  User } from '@auth/store/login-form/models';

export enum MockStateType {
  LoggedIn = 0,
  Clear = 1,
}

const mockState = (stateType: MockStateType) => {
  const state: User = {
    login: {
      asi_number: '',
      UserName: '',
      Password: '',
      appCode: '',
      appVersion: '',
      rememberMe: false,
    },
    token: {
      Token: '',
      TokenType: '',
      Status: '',
      Application: {
        Id: '',
        Code: '',
        Name: '',
        Version: '',
      },
    },
  };

  if (stateType === MockStateType.LoggedIn) {
    state.login = {
      asi_number: faker.lorem.word(),
      UserName: faker.lorem.word(),
      Password: faker.lorem.word(),
      appCode: faker.lorem.word(),
      appVersion: faker.lorem.word(),
      rememberMe: false,
    };
    state.token = {
      Token: faker.lorem.word(),
      TokenType: faker.lorem.word(),
      Status: faker.lorem.word(),
      Application: {
        Id: faker.lorem.word(),
        Code: faker.lorem.word(),
        Name: faker.lorem.word(),
        Version: faker.lorem.word(),
      },
    };
  } else {
    /**
     *  State is clear
     */
  }
  return state;
};

export class LoginFormStateMockModel {
  public static state(stateType: MockStateType = MockStateType.LoggedIn) {
    return mockState(stateType);
  }
}
