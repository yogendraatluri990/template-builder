import {LoginResponse} from '../../../types'
export interface LoginFormModel {
    asi_number: string;
    UserName: string;
    Password: string;
    appCode: string;
    appVersion: string;
    rememberMe: boolean;
}

export interface User {
    login: LoginFormModel;
    token: LoginResponse;
}