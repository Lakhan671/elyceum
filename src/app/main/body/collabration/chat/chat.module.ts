import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FuseChatComponent } from './chat.component';
import { ChatService } from './chat.service';
import { FuseChatViewComponent } from './chat-view/chat-view.component';
import { FuseChatStartComponent } from './chat-start/chat-start.component';
import { FuseChatChatsSidenavComponent } from './sidenavs/left/chats/chats.component';
import { FuseChatUserSidenavComponent } from './sidenavs/left/user/user.component';
import { FuseChatLeftSidenavComponent } from './sidenavs/left/left.component';
import { FuseChatRightSidenavComponent } from './sidenavs/right/right.component';
import { FuseChatContactSidenavComponent } from './sidenavs/right/contact/contact.component';
import {WebService} from '../../../../core/services/webservice';
import {ColabrationService} from '../collabarationweservice'
import { DatePipe } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
    {
        path     : '**',
        component: FuseChatComponent,
        children : [],
        resolve  : {
            chat: ChatService
        }
    }
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes),HttpClientModule 
    ],
    declarations: [
        FuseChatComponent,
        FuseChatViewComponent,
        FuseChatStartComponent,
        FuseChatChatsSidenavComponent,
        FuseChatUserSidenavComponent,
        FuseChatLeftSidenavComponent,
        FuseChatRightSidenavComponent,
        FuseChatContactSidenavComponent
    ],
    providers   : [
        ChatService,WebService,ColabrationService,DatePipe
    ]
})
export class FuseChatModule
{
}
