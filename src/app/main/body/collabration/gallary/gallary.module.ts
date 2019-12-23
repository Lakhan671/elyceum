import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
 
import { FlexLayoutModule } from '@angular/flex-layout';

 import { GallaryComponent } from './gallary.component';
  

 const routes = [
    {
        path     : '',
        component: GallaryComponent  
    }
];
@NgModule({
     declarations: [
         GallaryComponent 
       ],
    imports     : [
        SharedModule ,   FlexLayoutModule ,   
        RouterModule.forChild(routes)
    ],
    providers   : [ 
         
    ],
    entryComponents:[ ]
})
export class gallaryModule
{
}
