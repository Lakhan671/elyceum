import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import {  LoginComponent } from './login/login.component';
import {  RegisterComponent } from './register/register.component';
import { ForgotComponent  } from './forgot/forgot.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { WebService } from '../../../core/services/webservice';
import { HttpClientModule } from '@angular/common/http';

const routes = [
    {
        path     : 'login',
        component: LoginComponent
    }, {
        path     : 'register',
        component: RegisterComponent
    }, {
        path     : 'forgot',
        component: ForgotComponent
    }
];

@NgModule({
    declarations: [
        LoginComponent,RegisterComponent,ForgotComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),MatGridListModule,HttpClientModule
    ],
    exports     : [
        LoginComponent,RegisterComponent,ForgotComponent
        
    ],
    providers:[
        WebService
    ]
})
export class AuthModule {
}
