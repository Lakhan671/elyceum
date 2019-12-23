import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

 
import {CollabrationComponent} from './collabration.component';
  

 const routes = [
    {
        path     : '',
        component: CollabrationComponent
        
    }, {
        path     : 'chat',
        loadChildren: './chat/chat.module#FuseChatModule'
        
    },
    {
        path     : 'department',
        loadChildren: './department/department.module#DepartmentModule'
    } ,
    {
        path     : 'gallay',
        loadChildren: './gallary/gallary.module#gallaryModule'
    } ,
    {
        path     : 'document',
        loadChildren: './document/document.module#DocumentModule'
    } ,
    {
        path     : 'alumin',
        loadChildren: './alumin/alumin.module#AluminModule'
    } ,
    {
        path     : 'disscussion',
        loadChildren: './disscussion/disscussion.module#DisscussionModule'
    }
];

@NgModule({
     declarations: [
        CollabrationComponent 
       ],
    imports     : [
        SharedModule ,      
        RouterModule.forChild(routes)
    ],
    providers   : [ 
         
    ],
    entryComponents:[ ]
})
export class CollabrationModule
{
}
