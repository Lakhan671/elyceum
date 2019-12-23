import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {TeacherComponent} from './teacher.component'
import {TeacherDialogComponent} from '../../dialog/teacher-dialog/event-form.component';
import {TeacherWebService} from '../teacher/teacherWebservice';

  const routes = [
      
    {
        path     : '',
        component: TeacherComponent,
     } 
];

@NgModule({
     declarations: [TeacherComponent,TeacherDialogComponent
       ],
    imports     : [
        SharedModule ,      
        RouterModule.forChild(routes),HttpClientModule
    ],
    providers   : [ DatePipe,TeacherWebService
         
    ],
    entryComponents:[ TeacherDialogComponent ]
})
export class TeacherModule
{
}
