import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

 import {SemisterComponent} from './semister.component'
 import {ColabrationService} from '../../collabarationweservice';
 import {SemisterDialogComponent} from '../../../dialog/semister-dialog/semister-dialog.component'
 import {MatDatepickerModule} from '@angular/material/datepicker';

 const routes = [
      
    {
        path     : '',
        component: SemisterComponent
            
    } 
];

@NgModule({
     declarations: [SemisterComponent,SemisterDialogComponent
      ],
    imports     : [
        SharedModule ,      
        RouterModule.forChild(routes),HttpClientModule,MatDatepickerModule
    ],
    providers   : [  ColabrationService
         
    ],
    entryComponents:[  SemisterDialogComponent]
})
export class SemisterModule
{
}
