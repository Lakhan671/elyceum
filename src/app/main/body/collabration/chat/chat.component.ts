import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChatService } from './chat.service';
import { fuseAnimations } from '../../../../core/animations';
import { FuseConfigService } from '../../../../core/services/config.service';

@Component({
    selector     : 'fuse-chat',
    templateUrl  : './chat.component.html',
    styleUrls    : ['./chat.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FuseChatComponent implements OnInit
{
    selectedChat: any;

    constructor(private chatService: ChatService,private fuseConfig:FuseConfigService)
    {    this.fuseConfig.setSettings({
        layout: {
            navigation: 'top',
        toolbar   : 'above',
           footer    : 'none'
        }
    });
    }

    ngOnInit()
    {
        this.chatService.onChatSelected
            .subscribe(chatData => {
                this.selectedChat = chatData;
             });
    }

}
