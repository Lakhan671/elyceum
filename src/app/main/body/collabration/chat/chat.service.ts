import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FuseUtils } from '../../../../core/fuseUtils';
import {ColabrationService} from '../collabarationweservice'
@Injectable()
export class ChatService implements Resolve<any>
{
    contacts: any[];
    chats: any[];
    user: any;
    onChatSelected = new BehaviorSubject<any>(null);
    onContactSelected = new BehaviorSubject<any>(null);
    onChatsUpdated = new Subject<any>();
    onUserUpdated = new Subject<any>();
    onLeftSidenavViewChanged = new Subject<any>();
    onRightSidenavViewChanged = new Subject<any>();

    constructor(private http: HttpClient,private webservice:ColabrationService)
    {
    }

    /**
     * Get chat
     * @param contactId
     * @returns {Promise<any>}
     */
    setsendToId(data){
         
        sessionStorage.setItem('sendTo',data)
    }
    get sendToId (){
        return sessionStorage.getItem('sendTo');
    }
    getChat(contactId,show,start,end)
    {
       this.setsendToId(contactId);
 var data ={date:new Date(),
    tokenId:this.webservice.gettokken,
    sendTo:contactId,
    start:start,
    end:end}
      
        return new Promise((resolve, reject) => {
            this.http.post(this.webservice.BASE_URL + this.webservice.CHAT_MSG_GET,data)
                .subscribe((response: any) => {
                     const chat = response.data;

                 

                    const chatData = {
                        chatData : response.data,
                        chatShow:show
                     };

                    this.onChatSelected.next({...chatData});

                }, reject);

        });

    }

    /**
     * Create New Chat
     * @param contactId
     * @returns {Promise<any>}
     */
    createNewChat(contactId)
    {
        return new Promise((resolve, reject) => {

            const contact = this.contacts.find((item) => {
                return item.id === contactId;
            });

            const chatId = FuseUtils.generateGUID();

            const chat = {
                id    : chatId,
                dialog: []
            };

            const chatListItem = {
                contactId      : contactId,
                id             : chatId,
                lastMessageTime: '2017-02-18T10:30:18.931Z',
                name           : contact.name,
                unread         : null
            };

            /**
             * Add new chat list item to the user's chat list
             */
            this.user.chatList.push(chatListItem);

            /**
             * Post the created chat
             */
        
        });
    }

    /**
     * Select Contact
     * @param contact
     */
    selectContact(contact)
    {
        this.onContactSelected.next(contact);
    }

    /**
     * Set user status
     * @param status
     */
    setUserStatus(status)
    {
        this.user.status = status;
    }

    /**
     * Update user data
     * @param userData
     */
    updateUserData(userData)
    {
         
    }

    /**
     * Update the chat dialog
     * @param chatId
     * @param dialog
     * @returns {Promise<any>}
     */
    updateDialog(data): Promise<any>
    {
        return new Promise((resolve, reject) => {
            data.tokenId = this.webservice.gettokken;
            data.sendTo =this.sendToId;
             console.log(JSON.stringify(data))
             this.http.post(this.webservice.BASE_URL + this.webservice.CHAT_MSG_SEND, data)
                .subscribe(updatedChat => {
                    resolve(updatedChat);
                }, reject);
        });
    }

    /**
     * The Chat App Main Resolver
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
             ]).then(
                ([contacts, chats, user]) => {
                    this.contacts = contacts;
                    this.chats = chats;
                    this.user = user;
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get Contacts
     * @returns {Promise<any>}
     */
    getContacts(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            
        });
    }

    /**
     * Get Chats
     * @returns {Promise<any>}
     */
    getChats(): Promise<any>
    {
        return  
    }

    /**
     * Get User
     * @returns {Promise<any>}
     */
    getUser(): Promise<any>
    {
        return 
    }
}
