import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

 import { DisscussionComponent } from './disscussion.component';
  

 const routes = [
    {
        path     : '',
        component: DisscussionComponent
        
    } 
];

@NgModule({
     declarations: [
        DisscussionComponent,
       ],
    imports     : [
        SharedModule ,      
        RouterModule.forChild(routes)
    ],
    providers   : [ 
         
    ],
    entryComponents:[ ]
})
export class DisscussionModule
{
}
