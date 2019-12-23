 
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
  import {AlertDialogComponent} from '../../../dialog/alert-dialog/alert-dialog.component';
  import {WebserModel} from '../../../navigation/WebService'
  import { DatePipe } from '@angular/common';

    @Injectable()
  export class ColabrationService {
    userSetdate: any;
    User: any;
    BASE_URL = this.Model.Sevice.BASE_URL;
    DEP_LIST_GET  = this.Model.Sevice.DEP_LIST_GET;
    DEP_CERATE =this.Model.Sevice.DEP_CERATE;
    DEP_GET  = this.Model.Sevice.DEP_GET;
    DEP_UPDATE =this.Model.Sevice.DEP_UPDATE;
    COURSE_GET = this.Model.Sevice.COURSE_GET;
    COURSE_SAVE = this.Model.Sevice.COURSE_SAVE;
    COURSE_UPDATE = this.Model.Sevice.COURSE_UPDATE;
    COURSE_DETAIL = this.Model.Sevice.COURSE_DETAIL;
    BRANCH_LIST = this.Model.Sevice.BRANCH_LIST;
    BRANCH_CREATE = this.Model.Sevice.BRANCH_CREATE;
    BRANCH_UPDATE  = this.Model.Sevice.BRANCH_UPDATE;
    BRANCH_DETAIL= this.Model.Sevice.BRANCH_DETAIL;
    SESSiON_SAVE  = this.Model.Sevice.SESSiON_SAVE;
    SESSiON_UPDATE = this.Model.Sevice.SESSiON_UPDATE;
    SESSiON_GETS = this.Model.Sevice.SESSiON_GETS;
    SEMISTER_SAVE=this.Model.Sevice.SEMISTER_SAVE;
    SEMISTER_GETS = this.Model.Sevice.SEMISTER_GETS;
    SEMISTER_UPDATE=this.Model.Sevice.SEMISTER_UPDATE;
    ROOM_TYPE_SAVE=this.Model.Sevice.ROOM_TYPE_SAVE;
    ROOM_TYPE_UPDATE =this.Model.Sevice.ROOM_TYPE_UPDATE;
    ROOM_TYPE_GETS = this.Model.Sevice.ROOM_TYPE_GETS;
    ROOM_SAVE=this.Model.Sevice.ROOM_SAVE;
    ROOM_GETS = this.Model.Sevice.ROOM_GETS;
    SECTION_SAVE =this.Model.Sevice.SECTION_SAVE;
    SECTION_UPDATE=this.Model.Sevice.SECTION_UPDATE;
    SECTION_GETS =this.Model.Sevice.SECTION_GETS;
    SECTION_GET =this.Model.Sevice.SECTION_GET;
    USER_SERACH= this.Model.Sevice.USER_SERACH;
    CHAT_SEND_FRIEND_REQUEST =this.Model.Sevice.CHAT_SEND_FRIEND_REQUEST;
    CHAT_APPROVED_REQUEST  =this.Model.Sevice.CHAT_APPROVED_REQUEST;
    CHAT_UNAPPROVED_LIST = this.Model.Sevice.CHAT_UNAPPROVED_LIST;
    CHAT_FRIEND_LIST  = this.Model.Sevice.CHAT_FRIEND_LIST;
    CHAT_MSG_GET= this.Model.Sevice.CHAT_MSG_GET;
    CHAT_MSG_SEND= this.Model.Sevice.CHAT_MSG_SEND;

     constructor( private _http: HttpClient, private router: Router,public dialog: MatDialog
    ,private Model:WebserModel,private datePipe: DatePipe ) {
     }

     setTokken(token){
       sessionStorage.setItem('token',token);
     }
     get gettokken(){
       return sessionStorage.getItem('token')
     } 
     get getUserId(){
      return sessionStorage.getItem('UserId')
    }
     setDepartment(data){
      sessionStorage.setItem('dep',window.btoa(data));
     }
     setRoom(data){
      sessionStorage.setItem('room',window.btoa(data));
     }
     get getRoomType(){

      if(sessionStorage.getItem('room')){
       return window.atob(sessionStorage.getItem('room'));

      }else{
        return false;
      }
    }
    setSem(data){
      sessionStorage.setItem('sem',window.btoa(data));
     }
     get getSem(){

      if(sessionStorage.getItem('sem')){
       return window.atob(sessionStorage.getItem('sem'));

      }else{
        return false;
      }
    }
     get getDepartmentId(){

       if(sessionStorage.getItem('dep')){
        return window.atob(sessionStorage.getItem('dep'));

       }else{
         return false;
       }
     }
     setCourse(data){
      sessionStorage.setItem('cou',window.btoa(data));
     }
     get getCoursetId(){

       if(sessionStorage.getItem('cou')){
        return window.atob(sessionStorage.getItem('cou'));

       }else{
         return false;
       }
     }
     setBranch(data){
      sessionStorage.setItem('bran',window.btoa(data));
     }
     get getCoursetBranchId(){

       if(sessionStorage.getItem('bran')){
        return window.atob(sessionStorage.getItem('bran'));

       }else{
         return false;
       }
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
  userSearch (data){
    data.tokenId = this.gettokken;
    return this._http.post(this.BASE_URL + this.USER_SERACH, data)
    .map(res => < any > res)
    .catch(this.handleError);
  }
  sendFriendRequest (data){
    data.tokenId = this.gettokken;
    return this._http.post(this.BASE_URL + this.CHAT_SEND_FRIEND_REQUEST, data)
    .map(res => < any > res)
    .catch(this.handleError);
  }
  msgsend (data){
    data.tokenId = this.gettokken;
    return this._http.post(this.BASE_URL + this.CHAT_MSG_SEND, data)
    .map(res => < any > res)
    .catch(this.handleError);
  }
  msgget (data){
    data.tokenId = this.gettokken
    return this._http.post(this.BASE_URL + this.CHAT_MSG_GET, data)
    .map(res => < any > res)
    .catch(this.handleError);
  }

  getFrientList(): Observable < any > {
    var data  = {
        tokenId:this.gettokken
    }
   return this._http.post(this.BASE_URL + this.CHAT_FRIEND_LIST, data)
   .map(res => < any > res)
   .catch(this.handleError);
} 
  getSession(){
    var data  = {
      tokenId:this.gettokken
  }
  return this._http.post(this.BASE_URL + this.SESSiON_GETS, data)
 .map(res => < any > res)
 .catch(this.handleError);

  }
  getcourseDetail(data){
    
    data.tokenId = this.gettokken;
  
 return this._http.post(this.BASE_URL + this.COURSE_DETAIL, data)
 .map(res => < any > res)
 .catch(this.handleError);

  }
  saveSession(data): Observable < any >{
    data.tokenId = this.gettokken;
    console.log(JSON.stringify(data))
    return this._http.post(this.BASE_URL + this.SESSiON_SAVE, data)
    .map(res => < any > res)
    .catch(this.handleError);
    
       }
       updateSession(data): Observable < any >{
        data.tokenId = this.gettokken;
        console.log(JSON.stringify(data))
        return this._http.post(this.BASE_URL + this.SESSiON_UPDATE, data)
        .map(res => < any > res)
        .catch(this.handleError);
        
           }
    getDep(): Observable < any > {
        var data  = {
            tokenId:this.gettokken
        }
       return this._http.post(this.BASE_URL + this.DEP_GET, data)
       .map(res => < any > res)
       .catch(this.handleError);
   }
 
   getlistDep(): Observable < any > {
    var data  = {
        tokenId:this.gettokken
    }
   return this._http.post(this.BASE_URL + this.DEP_LIST_GET, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
getlistCou(data): Observable < any > {
  data.tokenId=this.gettokken;
 console.log(JSON.stringify(data))
 return this._http.post(this.BASE_URL + this.COURSE_GET, data)
 .map(res => < any > res)
 .catch(this.handleError);
}
getlistBran(data): Observable < any > {
  data.tokenId=this.gettokken;
  return this._http.post(this.BASE_URL + this.BRANCH_LIST, data)
 .map(res => < any > res)
 .catch(this.handleError);
}
   saveDep(data): Observable < any >{
data.tokenId = this.gettokken;
console.log(JSON.stringify(data))
return this._http.post(this.BASE_URL + this.DEP_CERATE, data)
.map(res => < any > res)
.catch(this.handleError);

   }
   saveCou(data): Observable < any >{
    data.tokenId = this.gettokken;
    console.log("course" +JSON.stringify(data));
     return this._http.post(this.BASE_URL + this.COURSE_SAVE, data)
    .map(res => < any > res)
    .catch(this.handleError);
    
       }
       saveBra(data): Observable < any >{
        data.tokenId = this.gettokken;
        console.log("Branch" +JSON.stringify(data));
         return this._http.post(this.BASE_URL + this.BRANCH_CREATE, data)
        .map(res => < any > res)
        .catch(this.handleError);
        
           }
       updateCou(data): Observable < any >{
        data.tokenId = this.gettokken;
         return this._http.post(this.BASE_URL + this.COURSE_UPDATE, data)
        .map(res => < any > res)
        .catch(this.handleError);
        
           }
           updateBra(data): Observable < any >{
            data.tokenId = this.gettokken;
             return this._http.post(this.BASE_URL + this.BRANCH_UPDATE, data)
            .map(res => < any > res)
            .catch(this.handleError);
            
               }
   updateDep(data): Observable < any >{
    data.tokenId = this.gettokken;
    return this._http.post(this.BASE_URL + this.DEP_UPDATE, data)
    .map(res => < any > res)
    .catch(this.handleError);
    
       }

      //  Semester Function
      saveSem(data): Observable < any >{
        data.semStartDate=    this.datePipe.transform(data.semStartDate, 'yyyy-MM-dd HH:MM:SS');
        data.semEndDate=    this.datePipe.transform(data.semEndDate, 'yyyy-MM-dd HH:MM:SS');

        data.tokenId = this.gettokken;
        
        console.log("Semester" +JSON.stringify(data));
         return this._http.post(this.BASE_URL + this.SEMISTER_SAVE, data)
        .map(res => < any > res)
        .catch(this.handleError);
        
           }
           updateSem(data): Observable < any >{
            data.semStartDate=    this.datePipe.transform(data.semStartDate, 'yyyy-MM-dd HH:MM:SS');
            data.semEndDate=    this.datePipe.transform(data.semEndDate, 'yyyy-MM-dd HH:MM:SS');
    
            data.tokenId = this.gettokken;
            console.log(JSON.stringify(data))
            return this._http.post(this.BASE_URL + this.SEMISTER_UPDATE, data)
            .map(res => < any > res)
            .catch(this.handleError);
            
               }
               getlistSem(data): Observable < any > {
                data.tokenId=this.gettokken;
                console.log(JSON.stringify(data))
                 return this._http.post(this.BASE_URL + this.SEMISTER_GETS, data)
               .map(res => < any > res)
               .catch(this.handleError);
              }
              // Room function
              saveRoomType(data): Observable < any >{
         
                data.tokenId = this.gettokken;
                
                  return this._http.post(this.BASE_URL + this.ROOM_TYPE_SAVE, data)
                .map(res => < any > res)
                .catch(this.handleError);
                
                   }
                   getlistRoomTypeList(): Observable < any > {
                     var data= {tokenId:this.gettokken}
 
                      return this._http.post(this.BASE_URL + this.ROOM_TYPE_GETS, data)
                   .map(res => < any > res)
                   .catch(this.handleError);
                  }
                 updateRoomType(data): Observable < any >{
         
                    data.tokenId = this.gettokken;
                    
                      return this._http.post(this.BASE_URL + this.ROOM_TYPE_UPDATE, data)
                    .map(res => < any > res)
                    .catch(this.handleError);
                    
                       }
                       saveRoom(data): Observable < any >{
         
                        data.tokenId = this.gettokken;
                        
                          return this._http.post(this.BASE_URL + this.ROOM_SAVE, data)
                        .map(res => < any > res)
                        .catch(this.handleError);
                        
                           }
                           getlistRoomList( ): Observable < any > {
                            var data= {tokenId:this.gettokken}
        
                             return this._http.post(this.BASE_URL + this.ROOM_GETS, data)
                          .map(res => < any > res)
                          .catch(this.handleError);
                         }
                         saveSection(data): Observable < any >{
         
                          data.tokenId = this.gettokken;
                          
                            return this._http.post(this.BASE_URL + this.SECTION_SAVE, data)
                          .map(res => < any > res)
                          .catch(this.handleError);
                          
                             }
                             getsSection(data): Observable < any >{
         
                              data.tokenId = this.gettokken;
                              
                                return this._http.post(this.BASE_URL + this.SECTION_GETS, data)
                              .map(res => < any > res)
                              .catch(this.handleError);
                              
                                 }
                                updateSection(data): Observable < any >{
         
                                  data.tokenId = this.gettokken;
                                  
                                    return this._http.post(this.BASE_URL + this.SECTION_UPDATE, data)
                                  .map(res => < any > res)
                                  .catch(this.handleError);
                                  
                                     }
    // Handle Api Errors
    private handleError(error: Response) {
      console.log(error); 
       return Observable.throw(error);
    }
  }