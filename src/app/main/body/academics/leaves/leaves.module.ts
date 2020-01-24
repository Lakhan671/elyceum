import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {LeavesComponent} from '../leaves/leaves.component';
import {LeavesWebService} from './leaves.webservice';
import {LectureDialogComponent} from '../../dialog/lecture-dialog/lecture-dialog.component';
 import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { LeaveTypeComponent } from 'src/app/main/body/academics/leaves/leaves-type/leaves-type.component';
import { LeaveTypeDialogComponent } from 'src/app/main/body/dialog/leave-type-dialog/leave-type-dialog.component';

   const routes = [  
    {
        path     : '',
        component: LeavesComponent ,
     } 
     ,
     {
        path     : 'leaveType',
        component: LeaveTypeComponent ,
     } 
];

@NgModule({
     declarations: [ LeavesComponent,LeaveTypeComponent,LeaveTypeDialogComponent
       ],
    imports     : [
        TimepickerModule.forRoot(),
        SharedModule ,      
        RouterModule.forChild(routes),HttpClientModule 
    ],
    providers   : [ DatePipe, LeavesWebService
         
    ],
    entryComponents:[ LeaveTypeDialogComponent ]
})
export class LeavesModule
{
}
