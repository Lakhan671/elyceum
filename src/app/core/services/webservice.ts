 
  import { HttpClient } from '@angular/common/http';

  import {
    Injectable
  } from '@angular/core';
  import {
    Router
  } from '@angular/router';
  import {
    Observable
  } from 'rxjs/Observable';
  import 'rxjs/add/operator/map';
  import 'rxjs/add/operator/do';
  import 'rxjs/add/operator/catch';
  import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSort} from '@angular/material';
  import {AlertDialogComponent} from '../../dialog/alert-dialog/alert-dialog.component';
  import {WebserModel} from '../../navigation/WebService'
    @Injectable()
  export class WebService {
    userSetdate: any;
    User: any;
    BASE_URL = this.Model.Sevice.BASE_URL;
    CREATE_USER = this.Model.Sevice.CREATE_USER;
    USER_LOGIN =this.Model.Sevice.USER_LOGIN
    ADD_USER = this.Model.Sevice.ADD_USER
    GET_USER = this.Model.Sevice.GET_USER
    GET_USER_TYPE = this.Model.Sevice.GET_USER_TYPE
    GET_CHAT_DATA = this.Model.Sevice.GET_CHAT_DATA;
    GROUP_CREATE = this.Model.Sevice.GROUP_CREATE
    GROUP_GET = this.Model.Sevice.GROUP_GET
    GROUP_UPDATE=this.Model.Sevice.GROUP_UPDATE
    GROUP_MEMBER_GET=this.Model.Sevice.GROUP_MEMBER_GET
    GROUP_MEMBER_DELETE=this.Model.Sevice.GROUP_MEMBER_DELETE
    GROUP_MEMBER_ADD=this.Model.Sevice.GROUP_MEMBER_ADD
    GROUP_MSG_POST=this.Model.Sevice.GROUP_MSG_POST
    GROUP_MSG_GET=this.Model.Sevice.GROUP_MSG_GET
    GROUP_REPLY_SEND=this.Model.Sevice.GROUP_REPLY_SEND
    GROUP_REPLY_GET=this.Model.Sevice.GROUP_REPLY_GET
    GROUP_POST_ADD_LIKE=this.Model.Sevice.GROUP_POST_ADD_LIKE
    GROUP_UPDATE_POST_LIKE=this.Model.Sevice.GROUP_UPDATE_POST_LIKE
    GROUP_GET_POST_LIKE=this.Model.Sevice.GROUP_GET_POST_LIKE
    GROUP_ADD_POST_COMMENT_LIKE=this.Model.Sevice.GROUP_ADD_POST_COMMENT_LIKE
    GROUP_UPDATE_POST_COMMENT_LIKE=this.Model.Sevice.GROUP_UPDATE_POST_COMMENT_LIKE
    GROUP_GET_POST_COMMENT_LIKE=this.Model.Sevice.GROUP_GET_POST_COMMENT_LIKE
    GROUP_GET_POST_COMMENT_SEND=this.Model.Sevice.GROUP_GET_POST_COMMENT_SEND
    GROUP_GET_POST_COMMENT_GET=this.Model.Sevice.GROUP_GET_POST_COMMENT_GET
    GROUP_GET_POST_COMMENT_UPDATE=this.Model.Sevice.GROUP_GET_POST_COMMENT_UPDATE
    CHAT_FRIEND_LIST  = this.Model.Sevice.CHAT_FRIEND_LIST;

     constructor( private _http: HttpClient, private router: Router,public dialog: MatDialog
    ,private Model:WebserModel ) {
     }
     setTokken(token){
       sessionStorage.setItem('token',token);
     }
     setUserId(token){
      sessionStorage.setItem('UserId',token);
    }
    setUserName(token){
      sessionStorage.setItem('UserName',token);
    }
    getUserId(token){
      sessionStorage.getItem('UserId');
    }
    setgroup(data){
      sessionStorage.setItem('group',window.btoa(data));
     }
     setgrouId(data){
      sessionStorage.setItem('groupDetail',window.btoa(JSON.stringify(data)));

     }
     getFrientList(): Observable < any > {
      var data  = {
          tokenId:this.gettokken
      }
     return this._http.post(this.BASE_URL + this.CHAT_FRIEND_LIST, data)
     .map(res => < any > res)
     .catch(this.handleError);
  } 
     get getgroupDetail(){

      if(sessionStorage.getItem('groupDetail')){
       return JSON.parse(window.atob(sessionStorage.getItem('groupDetail')));

      }else{
        return false;
      }
    }
     get getgroup(){

      if(sessionStorage.getItem('group')){
       return window.atob(sessionStorage.getItem('group'));

      }else{
        return false;
      }
    }
     get gettokken(){
       return sessionStorage.getItem('token')
     }
  alertDialog(message,state){

    let dialogRef = this.dialog.open(AlertDialogComponent, {
      height: '350px',
      width: '350px',
      data: { message:message  }
   });
  dialogRef.afterClosed().subscribe(result => {
     this.router.navigate([state])
    });
  }
  // group services
  groupget(): Observable < any > {
    let  data = {
      tokenId:this.gettokken
    }
  
   return this._http.post(this.BASE_URL + this.GROUP_GET, data)
     .map(res => < any > res)
     .catch(this.handleError);
 }
 groupcreate(data): Observable < any > {
  data.tokenId=this.gettokken
   

 return this._http.post(this.BASE_URL + this.GROUP_CREATE, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
groupupdate(data): Observable < any > {
  data.tokenId=this.gettokken
   

 return this._http.post(this.BASE_URL + this.GROUP_UPDATE, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
groupmemberGet(data): Observable < any > {
  data.tokenId=this.gettokken
   

 return this._http.post(this.BASE_URL + this.GROUP_MEMBER_GET, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
groupmemberDelete(data): Observable < any > {
  data.tokenId=this.gettokken
   

 return this._http.post(this.BASE_URL + this.GROUP_MEMBER_DELETE, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
groupmemberAdd(data): Observable < any > {
  data.userId = data.userId.toString();
  data.tokenId=this.gettokken;
   data.groupId = this.getgroupDetail.groupId;
console.log(data)
 return this._http.post(this.BASE_URL + this.GROUP_MEMBER_ADD, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
groupmsgPost(data): Observable < any > {
  data.tokenId=this.gettokken
  data.groupId = this.getgroupDetail.groupId;


 return this._http.post(this.BASE_URL + this.GROUP_MSG_POST, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
groupmsgGet(start, end): Observable < any > {
  var data ={
    groupId :this.getgroupDetail.groupId,
    tokenId:this.gettokken,
    "start":start,"end":end
  }
  
   

 return this._http.post(this.BASE_URL + this.GROUP_MSG_GET, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
groupmsgReplyPost(data): Observable < any > {
  data.tokenId=this.gettokken
   

 return this._http.post(this.BASE_URL + this.GROUP_REPLY_SEND, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
groupmsgReplyGet(data): Observable < any > {
  data.tokenId=this.gettokken
   

 return this._http.post(this.BASE_URL + this.GROUP_REPLY_GET, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
groupmsgPostLike(data): Observable < any > {
  data.tokenId=this.gettokken
   

 return this._http.post(this.BASE_URL + this.GROUP_POST_ADD_LIKE, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
groupmsgPostUpdateLike(data): Observable < any > {
  data.tokenId=this.gettokken
   

 return this._http.post(this.BASE_URL + this.GROUP_UPDATE_POST_LIKE, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
groupmsgPostgetike(data): Observable < any > {
  data.tokenId=this.gettokken
   

 return this._http.post(this.BASE_URL + this.GROUP_GET_POST_LIKE, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
groupmsgPostCommentLike(data): Observable < any > {
  data.tokenId=this.gettokken
   

 return this._http.post(this.BASE_URL + this.GROUP_ADD_POST_COMMENT_LIKE, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
groupmsgPostCommentUpdateLike(data): Observable < any > {
  data.tokenId=this.gettokken
   

 return this._http.post(this.BASE_URL + this.GROUP_UPDATE_POST_COMMENT_LIKE, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
groupmsgPostCommentGetLike(data): Observable < any > {
  data.tokenId=this.gettokken
   

 return this._http.post(this.BASE_URL + this.GROUP_GET_POST_COMMENT_LIKE, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
groupmsgPostCommentSend(data): Observable < any > {
  data.tokenId=this.gettokken
   
  data.groupId = this.getgroupDetail.groupId;
console.log(JSON.stringify(data));
 return this._http.post(this.BASE_URL + this.GROUP_GET_POST_COMMENT_SEND, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
groupmsgPostCommentget(data): Observable < any > {
  data.tokenId=this.gettokken
   

 return this._http.post(this.BASE_URL + this.GROUP_GET_POST_COMMENT_GET, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
groupmsgPostCommentUpdate(data): Observable < any > {
  data.tokenId=this.gettokken
   

 return this._http.post(this.BASE_URL + this.GROUP_GET_POST_COMMENT_UPDATE, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
    CreateUser(data): Observable < any > {
      return this._http.post(this.Model.Sevice.BASE_URL + this.CREATE_USER, data)
        .map(res => < any > res)
        .catch(this.handleError);
    }
addUser(data): Observable < any > {
   data.tokenId = this.gettokken;

  return this._http.post(this.BASE_URL + this.ADD_USER, data)
    .map(res => < any > res)
    .catch(this.handleError);
}
getUser(): Observable < any > {
  var data = {
    tokenId : this.gettokken
  }
   return this._http.post(this.BASE_URL + this.GET_USER, data)
    .map(res => < any > res)
    .catch(this.handleError);
};
getUserType(): Observable < any > {
  var data = {
    tokenId : this.gettokken
  }
  
  return this._http.post(this.BASE_URL + this.GET_USER_TYPE, data)
    .map(res => < any > res)
    .catch(this.handleError);
}
    LoginUser(data): Observable < any > {
      return this._http.post(this.BASE_URL + this.USER_LOGIN, data)
       .map(res => < any > res)
       .catch(this.handleError);
   }
    // Handle Api Errors
    private handleError(error: Response) {
      console.log(error);
       return Observable.throw(error);
    }
  }