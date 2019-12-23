import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
 
  import {MatGridListModule} from '@angular/material/grid-list';
import {SecionService} from './section/section.webservice'
import {AcademicsComponent} from './academics.component';
import { ClassComponent } from './class/class.component';
import { SectionComponent } from './section/section.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {SectionStudentDialogComponent} from '../dialog/section-student-dialog/section-student-dialog.component'

   const routes = [
    {
        path     : '',
        component: AcademicsComponent
        
    }, {
        path     : 'class',
        component: ClassComponent
        
    },{
        path:'teacher',
        loadChildren: './teacher/teacher.module#TeacherModule'

    },
    {
        path:'lecture',

        loadChildren: './lecture/lectre.module#lectureModule'

    },
    {
        path:'fee',

        loadChildren: './fee/fee.module#feeModule'

    },
    {
        path:'attendance',
        loadChildren: './attendace/attendance.module#AttendaceModule'

    },
    {
        path:'section',
        component: SectionComponent

    }
];

@NgModule({
     declarations: [
        AcademicsComponent,
        ClassComponent,
        SectionComponent,SectionStudentDialogComponent
       ],
    imports     : [
        SharedModule ,      
        RouterModule.forChild(routes),MatGridListModule,HttpClientModule
    ],
    providers   : [
        SecionService,DatePipe
    ],
    entryComponents:[SectionStudentDialogComponent]

})
export class AcademicsModule
{
}
