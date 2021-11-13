export interface LoginRequest {
  asi_number: string;
  UserName: string;
  Password: string;
  appCode: string | null;
  appVersion: string;
  rememberMe?: boolean;
}
