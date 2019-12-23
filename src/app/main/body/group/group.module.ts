import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill'

import { GroupComponent } from './group.component';
import {WebService} from '../../../core/services/webservice'
import { GroupDialogComponent } from '../../body/dialog/group-dialog/group-dialog.component';
import { GroupMemberComponent } from './group-member/group-member.component';
import { GroupPostComponent } from './group-post/group-post.component';

const routes = [
    {
        path     : '',
        component: GroupComponent
    },{
    path:'member',
    component:GroupMemberComponent,
    },{
        path:'Post',
        component:GroupPostComponent,
        }
];

@NgModule({
    declarations: [
        GroupComponent, GroupDialogComponent, GroupMemberComponent, GroupPostComponent
    ],
    imports     : [QuillModule,
        SharedModule,
        RouterModule.forChild(routes),HttpClientModule
    ],entryComponents:[ GroupDialogComponent],
    exports     : [
        GroupComponent
    ],
    providers:[WebService]
})
export class GroupModule {
}
