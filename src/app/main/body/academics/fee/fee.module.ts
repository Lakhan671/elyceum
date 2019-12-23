import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {FeeComponent} from '../fee/fee.component';
import { FeeTypeComponent } from './fee-type/fee-type.component'
import {FeeTypeDialogComponent} from '../../dialog/fee-type-dialog/fee-type-dialog.component'
import {FeeDialogComponent} from '../../dialog/fee-dialog/fee-dialog.component'
import  {feeWebService} from './feeWebservice' 
import {StudentService} from '../../student/studentWebservice';

  const routes = [
      
    {
        path     : '',
        component:  FeeComponent,
     },{
         path:'feeType',
         component:FeeTypeComponent
     } 
];

@NgModule({
     declarations: [ FeeComponent, FeeTypeComponent,FeeTypeDialogComponent,FeeDialogComponent
       ],
    imports     : [
        SharedModule ,      
        RouterModule.forChild(routes),HttpClientModule
    ],
    providers   : [ DatePipe ,feeWebService,StudentService
         
    ],
    entryComponents:[ FeeTypeDialogComponent ,FeeDialogComponent ]
})
export class feeModule
{
}
