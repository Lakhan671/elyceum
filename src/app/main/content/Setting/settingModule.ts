import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { StudentSettingComponent } from './student-setting/student-setting.component';
import {WebService} from '../../../core/services/webservice'

const routes = [
    {
        path     : 'student',
        component: StudentSettingComponent
    }
];

@NgModule({
    declarations: [
        StudentSettingComponent, 
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),HttpClientModule
    ],entryComponents:[ ],
    exports     : [
        StudentSettingComponent
    ],
    providers:[WebService]
})
export class SettingModule {
}
