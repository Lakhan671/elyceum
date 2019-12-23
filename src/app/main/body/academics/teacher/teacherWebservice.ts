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
  import {MatDialog} from '@angular/material';
  import {AlertDialogComponent} from '../../../../dialog/alert-dialog/alert-dialog.component';
  import {WebserModel} from '../../../../navigation/WebService'
  import { DatePipe } from '@angular/common';

    @Injectable()
  export class TeacherWebService {
    userSetdate: any;
    User: any;
    BASE_URL = this.Model.Sevice.BASE_URL;
 TEACHER_SAVE = this.Model.Sevice.TEACHER_SAVE;
 TEACHER_UPDATE = this.Model.Sevice.TEACHER_UPDATE;
 TEACHER_GETS = this.Model.Sevice.TEACHER_GETS;

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
                    getlistTeacher(): Observable < any > {
                     var data= {tokenId:this.gettokken}
 
                      return this._http.post(this.BASE_URL + this.TEACHER_GETS, data)
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