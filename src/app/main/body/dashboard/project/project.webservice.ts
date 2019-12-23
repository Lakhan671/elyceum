 
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
  import {AlertDialogComponent} from '../../../../dialog/alert-dialog/alert-dialog.component';
  import {WebserModel} from '../../../../navigation/WebService'
  import { DatePipe } from '@angular/common';

    @Injectable()
  export class ProjectWebService {
    userSetdate: any;
    User: any;
    BASE_URL = this.Model.Sevice.BASE_URL;
     CALENDAR_TYPE_GETS = this.Model.Sevice.CALENDAR_TYPE_GETS;
     CALENDAR_GETS = this.Model.Sevice.CALENDAR_GETS;
     DASHBOARD_COURSE_DEPT_COUNT_GET= this.Model.Sevice.DASHBOARD_COURSE_DEPT_COUNT_GET;
    DASHBOARD_STUDENT_COUNT_GET= this.Model.Sevice.DASHBOARD_STUDENT_COUNT_GET;
    WEB_API = this.Model.Sevice.WEB_API;
    LEAVE_GET= this.Model.Sevice.LEAVE_GET;
    STUDENT_LEAVE_WEEKLY= this.Model.Sevice.STUDENT_LEAVE_WEEKLY
     constructor( private _http: HttpClient, private router: Router,public dialog: MatDialog
    ,private Model:WebserModel,private datePipe: DatePipe ) {
     }
     setTokken(token){
       sessionStorage.setItem('token',token);
     }
     get gettokken(){
       return sessionStorage.getItem('token')
     }
     setLat(data){
       alert(data)
      sessionStorage.setItem('lat',data.toString());
    }
    get getLat(){
      return parseFloat(sessionStorage.getItem('lat'))
    }
    setLon(data){
      sessionStorage.setItem('Lon',data.toString());
    }
    get getLon(){
      return parseFloat(sessionStorage.getItem('Lon'))
    }
     get userName(){
         return sessionStorage.getItem('UserName')
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
  weathergetData(lat,log): Observable < any >{
     
     return this._http.get(this.BASE_URL + this.WEB_API+lat+','+log)
    .map(res => < any > res)
    .catch(this.handleError);
    
       }  
       getStudentWeekly(): Observable < any >{
        let data = {tokenId : this.gettokken};
         return this._http.post(this.BASE_URL + this.STUDENT_LEAVE_WEEKLY, data)
        .map(res => < any > res)
        .catch(this.handleError);
        
           }  
       
        //calendar Type function
   getCalenderType(): Observable < any >{
let data = {tokenId : this.gettokken};
 return this._http.post(this.BASE_URL + this.CALENDAR_TYPE_GETS, data)
.map(res => < any > res)
.catch(this.handleError);

   }  

   //Calendar Function
   getCalenderList(data): Observable < any >{
     data.tokenId= this.gettokken;
     return this._http.post(this.BASE_URL + this.CALENDAR_GETS, data)
    .map(res => < any > res)
    .catch(this.handleError);
    
       }  

                   getDashboard(): Observable < any > {
                   let data = {tokenId:this.gettokken};
                      return this._http.post(this.BASE_URL + this.DASHBOARD_COURSE_DEPT_COUNT_GET, data)
                   .map(res => < any > res)
                   .catch(this.handleError);
                  }
                  getDashboardStudent(): Observable < any > {
                    let data = {tokenId:this.gettokken};
                    return this._http.post(this.BASE_URL + this.DASHBOARD_STUDENT_COUNT_GET, data)
                   .map(res => < any > res)
                   .catch(this.handleError);
                  }
                  getLeave(): Observable < any > {
                    let data = {tokenId:this.gettokken,"date":"2018-11-09 22:24:06"};
                    return this._http.post(this.BASE_URL + this.LEAVE_GET, data)
                   .map(res => < any > res)
                   .catch(this.handleError);
                  }
    // Handle Api Errors
    private handleError(error: Response) {
      console.log(error); 
       return Observable.throw(error);
    }
  }