import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
 import {StudentService} from '../studentWebservice'
 import { StudentPermotionComponent } from './student-permotion.component';
 import {PermotionDialogComponent} from '../../dialog/permotion-dialog/permotion-dialog.component'

 const routes = [
      
   {
        path     : 'type',
        component: StudentPermotionComponent       
    }, {
        path      : '',
        redirectTo: 'type'
    } 
];

@NgModule({
     declarations: [ StudentPermotionComponent,PermotionDialogComponent
        
       ],
    imports     : [
        SharedModule ,      
        RouterModule.forChild(routes),HttpClientModule
    ],
    providers   : [ DatePipe,StudentService
         
    ],
    entryComponents:[PermotionDialogComponent]
})
export class PermotionModule
{
}
