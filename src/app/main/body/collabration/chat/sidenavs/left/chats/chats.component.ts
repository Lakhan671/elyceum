import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../chat.service';
import { MediaObserver } from '@angular/flex-layout';
import { fuseAnimations } from '../../../../../../../core/animations';
import { FuseMatSidenavHelperService } from '../../../../../../../core/directives/fuse-mat-sidenav-helper/fuse-mat-sidenav-helper.service';
import {Router} from '@angular/router'
import {ColabrationService} from '../../../../collabarationweservice'

@Component({
    selector   : 'fuse-chat-chats-sidenav',
    templateUrl: './chats.component.html',
    styleUrls  : ['./chats.component.scss'],
    animations : fuseAnimations
})
export class FuseChatChatsSidenavComponent implements OnInit
{
    showChat:boolean;
    searchresult:any;
    friendList:any;
    user: any;
    chats: any[];
    contacts: any[];
    chatSearch: any;
    searchText = '';

    back(){
        this.router.navigate(['collabration']);
    }
  
    constructor(
        private webservice:ColabrationService,
        private chatService: ChatService,
        private fuseMatSidenavService: FuseMatSidenavHelperService,
        public media: MediaObserver,
        private router :Router
    )
    {
        this.chatSearch = {
            name: ''
        };
    }
 

    valuechange(newValue){
         var senddata = {
            searchStr:newValue
        }
        this.webservice.userSearch(senddata).subscribe(res=>{
            this.searchresult = res.data;
            console.log(JSON.stringify(this.searchresult))

        })
    }
    getFrientList(){
         this.webservice.getFrientList().subscribe(res => {
             this.friendList = res.data;
          })
    }
    msgget(id){
         
 this.showChat = false;
     if( this.friendList.length > 0){
        for( var i =0;i<this.friendList.length;i++){
           
             if(id.friendId == this.friendList[i].friendId){
                this.showChat = true;
             }
        }
    }
        this.chatService.getChat(id.friendId,this.showChat,0,10);

         // var data = {
        //     date:new Date(),
        //     sendTo:id
        // }
        // this.webservice.msgget(data).subscribe(res=>{
        //     alert(JSON.stringify(res.data));
        // })
    }
    ngOnInit()
    {
        this.getFrientList();
        this.user = this.chatService.user;
        console.log(this.user)
        this.chats = this.chatService.chats;
        this.contacts = this.chatService.contacts;

        this.chatService.onChatsUpdated.subscribe(updatedChats => {
            this.chats = updatedChats;
        });

        this.chatService.onUserUpdated.subscribe(updatedUser => {
            this.user = updatedUser;
        });
    }

    getChat(contact)
    {
 
         if ( !this.media.isActive('gt-md') )
        {
            this.fuseMatSidenavService.getSidenav('chat-left-sidenav').toggle();
        }
    }

    setUserStatus(status)
    {
        this.chatService.setUserStatus(status);
    }

    changeLeftSidenavView(view)
    {
        this.chatService.onLeftSidenavViewChanged.next(view);
    }

    logout()
    {
        console.log('logout triggered');
    }
}
