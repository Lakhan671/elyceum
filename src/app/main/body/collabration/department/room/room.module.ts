import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

 import {RoomComponent} from './room.component'
 import {RoomNameComponent} from './room-name/room-name.component'
 import {RoomTypeDialogComponent} from '../../../dialog/room-type-dialog/room-type-dialog.component'
 import {RoomDialogComponent} from '../../../dialog/room-dialog/room-dialog.component'

 import {ColabrationService} from '../../collabarationweservice';
 

 const routes = [
      
    {
        path     : '',
        component: RoomComponent
            
    } ,
    {
        path     : 'roomName',
        component: RoomNameComponent
            
    } 
];

@NgModule({
     declarations: [RoomComponent,RoomNameComponent,RoomTypeDialogComponent,RoomDialogComponent
      ],
    imports     : [
        SharedModule ,      
        RouterModule.forChild(routes),HttpClientModule
    ],
    providers   : [  ColabrationService
         
    ],
    entryComponents:[RoomTypeDialogComponent,RoomDialogComponent  ]
})
export class RoomModule
{
}
