 
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
  export class HomeService {
    userSetdate: any;
    User: any;
    BASE_URL = this.Model.Sevice.BASE_URL;
    NEWS_SAVE = this.Model.Sevice.NEWS_SAVE;
    NEWS_GETS = this.Model.Sevice.NEWS_GETS;
    NEWS_UPDATE = this.Model.Sevice.NEWS_UPDATE;
POST_GET = this.Model.Sevice.POST_GET;
POST_SEND = this.Model.Sevice.POST_SEND;

POST_UPDATE = this.Model.Sevice.POST_UPDATE;

POST_CMT_SEND = this.Model.Sevice.POST_CMT_SEND;
POST_CMT_GET = this.Model.Sevice.POST_CMT_GET;

POST_CMT_UPDATE = this.Model.Sevice.POST_CMT_UPDATE;
POST_CMT_REPLY_SEND = this.Model.Sevice.POST_CMT_REPLY_SEND;
POST_CMT_REPLY_GET = this.Model.Sevice.POST_CMT_REPLY_GET;
POST_CMT_REPLY_UPDATE = this.Model.Sevice.POST_CMT_REPLY_UPDATE;

 

     constructor( private _http: HttpClient, private router: Router,public dialog: MatDialog
    ,private Model:WebserModel,private datePipe: DatePipe ) {
     }
     setTokken(token){
       sessionStorage.setItem('token',token);
     }
     get gettokken(){
       return sessionStorage.getItem('token')
     }
     get getUser(){
      return sessionStorage.getItem('UserId')
    }
    get getuserName(){
      return sessionStorage.getItem('UserName')
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
  
  Newsget(): Observable < any >{
    
    var data ={
        tokenId:this.gettokken
      };
      console.log(JSON.stringify(data))
    return this._http.post(this.BASE_URL + this.NEWS_GETS, data)
    .map(res => < any > res)
    .catch(this.handleError);
    
       }
 
  NewsSave(data): Observable < any >{
    
    data.tokenId = this.gettokken;
    console.log(JSON.stringify(data))
    return this._http.post(this.BASE_URL + this.NEWS_SAVE, data)
    .map(res => < any > res)
    .catch(this.handleError);
    
       }
       NewsUpdate(data): Observable < any >{
    
        data.tokenId = this.gettokken;
        console.log(JSON.stringify(data))
        return this._http.post(this.BASE_URL + this.NEWS_UPDATE, data)
        .map(res => < any > res)
        .catch(this.handleError);
        
           }
           //Post service
            
  Postget(start,end): Observable < any >{
    
    var data ={
        tokenId:this.gettokken,
        start:start.toString(),
        end:end.toString()
      };
      
    return this._http.post(this.BASE_URL + this.POST_GET, data)
    .map(res => < any > res)
    .catch(this.handleError);
    
       }
       
       Postcmtget(data): Observable < any >{
    
        data.tokenId=this.gettokken

          console.log(JSON.stringify(data))
        return this._http.post(this.BASE_URL + this.POST_CMT_GET, data)
        .map(res => < any > res)
        .catch(this.handleError);
        
           }
           Postcmtreplyget(data): Observable < any >{
    
            data.tokenId=this.gettokken
               
              console.log(JSON.stringify(data))
            return this._http.post(this.BASE_URL + this.POST_CMT_REPLY_GET, data)
            .map(res => < any > res)
            .catch(this.handleError);
            
               }
               Postsend(data): Observable < any >{
    
                data.tokenId=this.gettokken;
                   
                  console.log(JSON.stringify(data))
                return this._http.post(this.BASE_URL + this.POST_SEND, data)
                .map(res => < any > res)
                .catch(this.handleError);
                
                   }
                   Postupdate(data): Observable < any >{
    
                    data.tokenId=this.gettokken
                       
                      console.log(JSON.stringify(data))
                    return this._http.post(this.BASE_URL + this.POST_UPDATE, data)
                    .map(res => < any > res)
                    .catch(this.handleError);
                    
                       }
                       Postcmtsend(data): Observable < any >{
    
                        data.tokenId=this.gettokken
                           
                          console.log(JSON.stringify(data))
                        return this._http.post(this.BASE_URL + this.POST_CMT_SEND, data)
                        .map(res => < any > res)
                        .catch(this.handleError);
                        
                           }
                           Postcmtupdate(data): Observable < any >{
    
                            data.tokenId=this.gettokken
                               
                              console.log(JSON.stringify(data))
                            return this._http.post(this.BASE_URL + this.POST_CMT_UPDATE, data)
                            .map(res => < any > res)
                            .catch(this.handleError);
                            
                               }
                               Postcmtreplysend(data): Observable < any >{
    
                                data.tokenId=this.gettokken
                                   
                                  console.log(JSON.stringify(data))
                                return this._http.post(this.BASE_URL + this.POST_CMT_REPLY_SEND, data)
                                .map(res => < any > res)
                                .catch(this.handleError);
                                
                                   }
                                   Postcmtreplyupdate(data): Observable < any >{
    
                                    data.tokenId=this.gettokken
                                       
                                      console.log(JSON.stringify(data))
                                    return this._http.post(this.BASE_URL + this.POST_CMT_REPLY_UPDATE, data)
                                    .map(res => < any > res)
                                    .catch(this.handleError);
                                    
                                       }
 
    // Handle Api Errors
    private handleError(error: Response) {
      console.log(error); 
       return Observable.throw(error);
    }
  }