import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import {HomeComponent} from './home.component'
import { QuillModule } from 'ngx-quill'
import { HomeService} from './homeWeService';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

  const routes = [
    {
        path     : '',
        component:  HomeComponent,
        
    }
];

@NgModule({
    declarations: [
        HomeComponent
     ],
    imports     : [QuillModule,HttpClientModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers   : [
        HomeService    ,DatePipe
    ]
})
export class HomeModule
{
}
