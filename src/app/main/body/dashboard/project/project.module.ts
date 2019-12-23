import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuseProjectComponent } from './project.component';
import { SharedModule } from '../../../../core/modules/shared.module';
import { ProjectsDashboardService } from './projects.service';
import { FuseWidgetModule } from '../../../../core/components/widget/widget.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProjectWebService } from './project.webservice';
import { DatePipe } from '@angular/common';
const routes: Routes = [
    {
        path     : '**',
        component: FuseProjectComponent 
        
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),
        FuseWidgetModule,
        NgxChartsModule
    ],
    declarations: [
        FuseProjectComponent
    ],
    providers   : [
        ProjectsDashboardService,ProjectWebService,DatePipe
    ]
})
export class FuseProjectDashboardModule
{
}

