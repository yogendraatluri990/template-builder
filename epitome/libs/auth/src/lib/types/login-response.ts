import { Application } from './application';

export interface LoginResponse {
  Token: string;
  TokenType: string;
  Status: string;
  Application: Application | {};
}
