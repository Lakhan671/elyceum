import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard.component'
  const routes = [
    {
        path     : '',
        component:  DashboardComponent,
        
    }
];

@NgModule({
    declarations: [
        DashboardComponent
     ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers   : [
         
    ]
})
export class DashModule
{
}
