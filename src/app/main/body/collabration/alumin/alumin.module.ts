import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

 
 import { AluminComponent } from '../alumin/alumin.component';
 

 const routes = [
    {
        path     : '',
        component: AluminComponent
        
    } 
];

@NgModule({
     declarations: [
         AluminComponent,
      ],
    imports     : [
        SharedModule ,      
        RouterModule.forChild(routes)
    ],
    providers   : [ 
         
    ],
    entryComponents:[ ]
})
export class  AluminModule
{
}
