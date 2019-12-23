import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
 import {SessionDialogComponent} from '../../../dialog/session-dialog/session-dialog.component'
  
 import {SessionComponent} from './session.component'
 import {ColabrationService} from '../../collabarationweservice';
 
  
 const routes = [
      
    {
        path     : '',
        component: SessionComponent
            
    } 
];

@NgModule({
     declarations: [SessionComponent,SessionDialogComponent 
      ],
    imports     : [
        SharedModule ,      
        RouterModule.forChild(routes),HttpClientModule 
    ],
    providers   : [  ColabrationService
         
    ],
    entryComponents:[  SessionDialogComponent]
})
export class SessionModule
{
}
