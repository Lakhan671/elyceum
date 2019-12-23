import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
 import {TeacherWebService} from '../teacher/teacherWebservice';
import {LectureComponent} from '../lecture/lecture.component';
import {LectureWebService} from './lecture.webservice';
import {StudentService} from '../../student/studentWebservice';
import {LectureDialogComponent} from '../../dialog/lecture-dialog/lecture-dialog.component';
 import { TimepickerModule } from 'ngx-bootstrap/timepicker';

   const routes = [
      
    {
        path     : '',
        component: LectureComponent ,
     } 
];

@NgModule({
     declarations: [ LectureComponent,LectureDialogComponent
       ],
    imports     : [
        TimepickerModule.forRoot(),
        SharedModule ,      
        RouterModule.forChild(routes),HttpClientModule 
    ],
    providers   : [ DatePipe,TeacherWebService, LectureWebService,StudentService
         
    ],
    entryComponents:[ LectureDialogComponent  ]
})
export class lectureModule
{
}
