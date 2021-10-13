import {LoginRequest} from '../../../types';
import { User } from '../models/model'



export class StoreUser{
    static type='[LoginForm] storeToken';
    constructor(public user: User) {}
}

export class ClearUserLogin{
    static type= '[LoginForm] ClearUserLogin';
}
