import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

 
 import { DocumentComponent } from './document.component';
   

 const routes = [
    {
        path     : '',
        component: DocumentComponent
        
    }   
];

@NgModule({
     declarations: [
         DocumentComponent,
       ],
    imports     : [
        SharedModule ,      
        RouterModule.forChild(routes)
    ],
    providers   : [ 
         
    ],
    entryComponents:[ ]
})
export class DocumentModule
{
}
