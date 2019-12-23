import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

 import {SectionComponent} from './section.component'
 import {ColabrationService} from '../../collabarationweservice';
 import {SectionDialogComponent} from '../../../dialog/section-dialog/section-dialog.component';
 

 const routes = [
      
    {
        path     : '',
        component: SectionComponent
            
    } 
];

@NgModule({
     declarations: [SectionComponent,SectionDialogComponent
      ],
    imports     : [
        SharedModule ,      
        RouterModule.forChild(routes),HttpClientModule
    ],
    providers   : [  ColabrationService
         
    ],
    entryComponents:[SectionDialogComponent  ]
})
export class SectionModule
{
}
