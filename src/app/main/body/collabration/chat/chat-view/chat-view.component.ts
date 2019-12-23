import { AfterViewInit, Component, OnInit, ViewChild, ViewChildren ,OnDestroy} from '@angular/core';
import { ChatService } from '../chat.service';
import { NgForm } from '@angular/forms';
import { FusePerfectScrollbarDirective } from '../../../../../core/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import {ColabrationService} from '../../collabarationweservice'
@Component({
    selector   : 'fuse-chat-view',
    templateUrl: './chat-view.component.html',
    styleUrls  : ['./chat-view.component.scss']
})
export class FuseChatViewComponent implements OnInit, AfterViewInit,OnDestroy
{
    scrollstatus:boolean = true;
    start:number= 0;
    end:number=10;
    user: any;
    chat: any;
    dialog: any;
    contact: any;
    replyInput: any;
    selectedChat: any;
    @ViewChild(FusePerfectScrollbarDirective,   {static: true}) directiveScroll: FusePerfectScrollbarDirective;
    @ViewChildren('replyInput',   {read: true}) replyInputField;
    @ViewChild('replyForm',   {static: true}) replyForm: NgForm;
userId:any;
    constructor(private chatService: ChatService,private webservice:ColabrationService)
    {
        this.userId = this.webservice.getUserId;
    }
showChat:boolean;
sendRequest(){
    var data = {
        friendId:this.chatService.sendToId
    }
     this.webservice.sendFriendRequest(data).subscribe(res=>{
          this.webservice.alertDialog(res.message,'collabration/chat')
    })
}
onKeydown(event){
 if(event.key == 'Enter'){
    this.reply();
}else{
    
}
}
chatinterval:any;
    ngOnInit()
    {
 clearInterval(this.chatinterval);
 this.chatinterval  =  setInterval(()=> {            this.scrollstatus = false;

            this.chatService.getChat(this.chatService.sendToId,this.showChat,this.start,this.end);

},4000); 
     
this.replyForm.reset();
this.focusReplyInput();
        this.showChat = false;

        this.user = this.chatService.contacts;
        this.chatService.onChatSelected
            .subscribe(chatData => {
                if ( chatData )
                {

this.showChat = chatData.chatShow;
                      this.selectedChat = chatData.chatData;
                       
                       
                    // this.contact = chatData.contact;
                    // this.dialog = chatData.dialog;
                    this.readyToReply();
                }
            });
    }
    public handleScroll(event: any) { 
        console.log(event.target.scrollTop);
         if ( event.target.scrollTop <=10 ) {
            this.scrollstatus = false;
           if(this.selectedChat.length  ==this.end ){
            this.end = this.end +10;
            this.chatService.getChat(this.chatService.sendToId,this.showChat,this.start,this.end);

           }

        }
    
      }
    ngAfterViewInit()
    {
        this.replyInput = this.replyInputField.first.nativeElement;
        this.readyToReply();
    }

    selectContact()
    {
         this.chatService.selectContact(this.contact);
    }

    readyToReply()
    {
        setTimeout(() => {
          
            this.scrollToBottom();
        });

    }
ngOnDestroy(){
    clearInterval(this.chatinterval);

}
    focusReplyInput()
    {
        setTimeout(() => {
            this.replyInput.focus();
        });
    }

    scrollToBottom(speed?: number)
    {
        speed = speed || 400;
        if ( this.directiveScroll )
        {
            this.directiveScroll.update();

            setTimeout(() => {
                if(this.scrollstatus){
                     this.directiveScroll.scrollToBottom(0, speed);

                }
            });
        }
    }

    reply()
    {
         // Message
         const message = {
            sendBy    : this.userId,
            message: this.replyForm.form.value.message,
            date   : new Date()

        };
        this.replyForm.reset();
        // Add the message to the chat
         this.selectedChat.push(message);

        // Update the server
        this.chatService.updateDialog(message).then(response => {
            this.replyForm.reset();
            this.focusReplyInput();        });

    }
}
