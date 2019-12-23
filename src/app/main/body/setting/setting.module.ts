import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { SettingComponent } from './setting.component';
import { StudentComponent } from './student/student.component';
import { CollegeComponent } from './college/college.component';
import {CollegeSettingService} from './college/college.service';
import {SettingService} from './setting.service';
import {StudentService} from './student/student.service'
import {WebService} from './college/collegewebservice'

 const routes = [
    {
        path     : '',
        component: SettingComponent,
        resolve  : {
            data: SettingService
        }

     }, {
        path     : 'student',
        component: StudentComponent,
        resolve  : {
            data: StudentService
        }
     }, {
        path     : 'college',
        component: CollegeComponent,
        resolve  : {
            data: CollegeSettingService
        }

      }
];

@NgModule({
    declarations: [
        SettingComponent,
        StudentComponent,
        CollegeComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),HttpClientModule
    ],
    exports     : [
        SettingComponent,        StudentComponent,
        CollegeComponent

    ],
    providers   : [CollegeSettingService,SettingService,StudentService,WebService
     ]

})

export class SettingModule {
}
