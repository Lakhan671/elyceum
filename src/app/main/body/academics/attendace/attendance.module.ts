import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
 import {AttendaceComponent} from './attendace.component'
 import {AtendanceWebService} from './attendance.webservice';
import { AttendanceHistoryComponent } from './attendance-history/attendance-history.component';
  const routes = [
      
    {
        path     : '',
        component: AttendaceComponent     },
        {path:'history',
    component:AttendanceHistoryComponent} 
];

@NgModule({
     declarations: [AttendaceComponent, AttendanceHistoryComponent
       ],
    imports     : [
        SharedModule ,      
        RouterModule.forChild(routes),HttpClientModule
    ],
    providers   : [ DatePipe,AtendanceWebService
         
    ],
    entryComponents:[ ]
})
export class AttendaceModule
{
}
