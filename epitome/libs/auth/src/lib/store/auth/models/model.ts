import {User} from '../../login-form';

export interface AuthStateModel {
  initialized: boolean;
  error: string | null;
  pending: boolean;
  loggedIn: boolean;
  user?: {
    displayName: string;
  } | null | User;
}
