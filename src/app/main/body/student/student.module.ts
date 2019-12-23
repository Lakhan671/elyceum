import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {StudentComponent} from './student.component'
 import {StudentDialogComponent} from '../dialog/student-dialog/student-dialog.component'
import {StudentService} from './studentWebservice'
import {MatDatepickerModule} from '@angular/material/datepicker';
 import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { SutdentAddComponent } from './sutdent-add/sutdent-add.component';
 
 const routes = [
      
    {
        path     : '',
        component: StudentComponent       
    }, {
        path     : 'Permotion',
        loadChildren: './student-permotion/permotion.model#PermotionModule'

     }, {
        path     : 'Attendance',
        component: StudentAttendanceComponent       
    }, {
        path     : 'Add',
        component: SutdentAddComponent ,
        data: { title: 'Add'} 
     
    }, {
        path     : 'Update',
        component: SutdentAddComponent  ,
        data: { title: 'Update'} 
   
    }
];

@NgModule({
     declarations: [StudentComponent,StudentDialogComponent, StudentAttendanceComponent, SutdentAddComponent
        
       ],
    imports     : [
        SharedModule ,      
        RouterModule.forChild(routes),HttpClientModule,MatDatepickerModule
    ],
    providers   : [ DatePipe,StudentService
         
    ],
    entryComponents:[ StudentDialogComponent]
})
export class StudentModule
{
}
