 
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
  export class CalendarWebService {
    userSetdate: any;
    User: any;
    BASE_URL = this.Model.Sevice.BASE_URL;
    CALENDER_TYPE = this.Model.Sevice.CALENDER_TYPE;
    CALENDAR_TYPE_GETS = this.Model.Sevice.CALENDAR_TYPE_GETS;
    CALENDER_TYPE_UPDATE = this.Model.Sevice.CALENDER_TYPE_UPDATE;
    CALENDER = this.Model.Sevice.CALENDER;
    CALENDAR_GETS = this.Model.Sevice.CALENDAR_GETS;
    CALENDER_UPDATE = this.Model.Sevice.CALENDER_UPDATE;

     constructor( private _http: HttpClient, private router: Router,public dialog: MatDialog
    ,private Model:WebserModel,private datePipe: DatePipe ) {
     }
     setTokken(token){
       sessionStorage.setItem('token',token);
     }
     get gettokken(){
       return sessionStorage.getItem('token')
     }
     seteventType(data){
      sessionStorage.setItem('eventT',window.btoa(data));
     }
     get geteventType(){

      if(sessionStorage.getItem('eventT')){
       return window.atob(sessionStorage.getItem('eventT'));

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
        //calendar Type function
   saveCalenderType(data): Observable < any >{
data.tokenId = this.gettokken;
console.log(JSON.stringify(data))
return this._http.post(this.BASE_URL + this.CALENDER_TYPE, data)
.map(res => < any > res)
.catch(this.handleError);

   }
  
       updateCalenderType(data): Observable < any >{
        data.tokenId = this.gettokken;
         return this._http.post(this.BASE_URL + this.CALENDER_TYPE_UPDATE, data)
        .map(res => < any > res)
        .catch(this.handleError);
        
           }
 
   
               getCalenderType(): Observable < any > {
                   var data ={
                    tokenId:this.gettokken
                   };
                  return this._http.post(this.BASE_URL + this.CALENDAR_TYPE_GETS, data)
               .map(res => < any > res)
               .catch(this.handleError);
              }
       //calendar function
            
   saveCalender(data): Observable < any >{
    data.tokenId = this.gettokken;
    data.startDate=    this.datePipe.transform(data.start, 'yyyy-MM-dd HH:MM:SS');
    data.endDate=    this.datePipe.transform(data.end, 'yyyy-MM-dd HH:MM:SS');

    console.log(JSON.stringify(data))
    return this._http.post(this.BASE_URL + this.CALENDER, data)
    .map(res => < any > res)
    .catch(this.handleError);
    
       }
      
           updateCalender(data): Observable < any >{
            data.tokenId = this.gettokken;
             return this._http.post(this.BASE_URL + this.CALENDER_UPDATE, data)
            .map(res => < any > res)
            .catch(this.handleError);
            
               }
     
          //  Semester Function
      
                   getCalender(data): Observable < any > {
                    data.tokenId=this.gettokken;
                    console.log(JSON.stringify(data))
                     return this._http.post(this.BASE_URL + this.CALENDAR_GETS, data)
                   .map(res => < any > res)
                   .catch(this.handleError);
                  }
    // Handle Api Errors
    private handleError(error: Response) {
      console.log(error); 
       return Observable.throw(error);
    }
  }