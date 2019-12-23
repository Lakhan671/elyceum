import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {SubjectComponent} from './subject.component'
 import {MatDatepickerModule} from '@angular/material/datepicker';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
  import { UnitDialogComponent} from '../dialog/unit-dialog/unit-dialog.component';
  import {SubjectService} from './SubjectWebservice';
   import { NgCircleProgressModule } from 'ng-circle-progress';

 const routes = [
      
    {
        path     : '',
        component: SubjectComponent       
    }, {
        path     : 'Create',
        component: CreateSubjectComponent },
        {
            path     : 'Detail',
            loadChildren: './subjectDetail/subjectDetail.model#SubjectDetailModule'
        }];

@NgModule({
     declarations: [SubjectComponent, CreateSubjectComponent,UnitDialogComponent  
        
       ],
    imports     : [
        SharedModule ,      
        RouterModule.forChild(routes),HttpClientModule,MatDatepickerModule,    NgCircleProgressModule.forRoot({
            // set defaults here
            radius: 100,
            outerStrokeWidth: 16,
            innerStrokeWidth: 8,
            outerStrokeColor: '#78C000',
            innerStrokeColor: '#C7E596',
            animationDuration: 300,
            
        }),
      
    ],
    providers   : [ DatePipe ,SubjectService
         
    ],
    entryComponents:[ UnitDialogComponent]
})
export class SubjectModule
{
}
