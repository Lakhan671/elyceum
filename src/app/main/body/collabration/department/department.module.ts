import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

 
 import { DepartmentComponent } from '../department/department.component';
import { CourseComponent } from './course/course.component';
import {departmentService} from '../department/department.service'
import {courseService} from './course/course.service';
import {ColabrationService} from '../collabarationweservice';
import {DepartmentDialogComponent} from '../../dialog/department/department.component'
import {CourseDialogComponent} from '../../dialog/course/course.component';
import { BranchComponent } from './branch/branch.component';
 import {BranchDialogComponent} from '../../dialog/branch-dialog/branch-dialog.component';
   
 const routes = [
      
    {
        path     : '',
        component: DepartmentComponent,
        resolve  : {
            data: departmentService
        }        
    },{
        path     : 'course',
        component: CourseComponent,
        resolve  : {
            data: courseService
        }        
    },{
        path     : 'branch',
        component: BranchComponent,
     },{
        path     : 'section',
        loadChildren: './section/section.module#SectionModule'
    },{
        path     : 'room',
        loadChildren: './room/room.module#RoomModule'
    },{
        path     : 'semister',
        loadChildren: './semister/semister.module#SemisterModule'
    }, {
        path     : 'session',
        loadChildren: './session/session.module#SessionModule'
    }
];

@NgModule({
     declarations: [
         DepartmentComponent,
        CourseComponent,
        DepartmentDialogComponent, 
        CourseDialogComponent, BranchDialogComponent,
         BranchComponent,  
      ],
    imports     : [
        SharedModule ,      
        RouterModule.forChild(routes),HttpClientModule
    ],
    providers   : [departmentService,courseService,ColabrationService,DatePipe
         
    ],
    entryComponents:[ DepartmentDialogComponent,CourseDialogComponent, BranchDialogComponent]
})
export class DepartmentModule
{
}
