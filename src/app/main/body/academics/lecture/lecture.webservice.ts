 
  import {
    Injectable
  } from '@angular/core';
  import { HttpClient } from '@angular/common/http';

  import {
    Router
  } from '@angular/router';
  import {
    Observable
  } from 'rxjs/Observable';
  import 'rxjs/add/operator/map';
  import 'rxjs/add/operator/do';
  import 'rxjs/add/operator/catch';
  import {MatDialog} from '@angular/material';
  import {AlertDialogComponent} from '../../../../dialog/alert-dialog/alert-dialog.component';
  import {WebserModel} from '../../../../navigation/WebService'
  import { DatePipe } from '@angular/common';

    @Injectable()
  export class LectureWebService {
    userSetdate: any;
    User: any;
    BASE_URL = this.Model.Sevice.BASE_URL;
 TEACHER_SAVE = this.Model.Sevice.TEACHER_SAVE;
 TEACHER_UPDATE = this.Model.Sevice.TEACHER_UPDATE;
 TEACHER_GETS = this.Model.Sevice.TEACHER_GETS;
 DAY_LIST = this.Model.Sevice.DAY_LIST;
 LECTURE_ROUTINE_SAVE = this.Model.Sevice.LECTURE_ROUTINE_SAVE;
 LECTURE_ROUTINE_UPDATE = this.Model.Sevice.LECTURE_ROUTINE_UPDATE;
 LECTURE_ROUTINE_GET_ = this.Model.Sevice.LECTURE_ROUTINE_GET_;
 ROOM_GETS = this.Model.Sevice.ROOM_GETS;
 SUBJECT_GETS  = this.Model.Sevice.SUBJECT_GETS;
 
     constructor( private _http: HttpClient, private router: Router,public dialog: MatDialog
    ,private Model:WebserModel,private datePipe: DatePipe ) {
     }
     setTokken(token){
       sessionStorage.setItem('token',token);
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

  getDayList(): Observable < any > {
 
     return this._http.get(this.BASE_URL + this.DAY_LIST)
  .map(res => < any > res)
  .catch(this.handleError);
 }
 getlectureList(data): Observable < any > {
 data.tokenId = this.gettokken;
    return this._http.post(this.BASE_URL + this.LECTURE_ROUTINE_GET_, data)
 .map(res => < any > res)
 .catch(this.handleError);
}

lectureSave(data): Observable < any > {
    data.tokenId = this.gettokken;
 data.lectureTime = this.datePipe.transform(data.lectureTime, 'yyyy-MM-dd HH:MM:SS');
 
    return this._http.post(this.BASE_URL + this.LECTURE_ROUTINE_SAVE,data)
 .map(res => < any > res)
 .catch(this.handleError);
}
lectureUpdate(data): Observable < any > {
    data.tokenId = this.gettokken;
 
    return this._http.post(this.BASE_URL + this.LECTURE_ROUTINE_UPDATE,data)
 .map(res => < any > res)
 .catch(this.handleError);
}

                    getlistTeacher(): Observable < any > {
                     var data= {tokenId:this.gettokken}
 
                      return this._http.post(this.BASE_URL + this.TEACHER_GETS, data)
                   .map(res => < any > res)
                   .catch(this.handleError);
                  }
                  getlistSubject(): Observable < any > {
                    var data= {tokenId:this.gettokken,
                    start:1,end:1000}

                     return this._http.post(this.BASE_URL + this.SUBJECT_GETS, data)
                  .map(res => < any > res)
                  .catch(this.handleError);
                 }
                 getlistRoom(): Observable < any > {
                    var data= {tokenId:this.gettokken}

                     return this._http.post(this.BASE_URL + this.ROOM_GETS, data)
                  .map(res => < any > res)
                  .catch(this.handleError);
                 }
                 SaveTeacher(data): Observable < any > {
                    data.tokenId=this.gettokken;
                    data.image = "";
                    data.userId = "0";

console.log(JSON.stringify(data))
                     return this._http.post(this.BASE_URL + this.TEACHER_SAVE, data)
                  .map(res => < any > res)
                  .catch(this.handleError);
                 }
                 UpdateTeacher(data): Observable < any > {
                  data.tokenId=this.gettokken;

                     return this._http.post(this.BASE_URL + this.TEACHER_UPDATE, data)
                  .map(res => < any > res)
                  .catch(this.handleError);
                 }
     // Handle Api Errors
    private handleError(error: Response) {
      console.log(error); 
       return Observable.throw(error);
    }
  }