import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginPage} from './pages/login.page';

const routes: Routes = [
    {
        path: 'login',
        component: LoginPage,
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {}