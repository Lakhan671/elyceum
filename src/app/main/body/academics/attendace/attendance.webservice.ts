import {
  HttpClient
  
} from '@angular/common/http';
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
export class AtendanceWebService {
  userSetdate: any;
  User: any;
  BASE_URL = this.Model.Sevice.BASE_URL;
  SUBJECT_GETS = this.Model.Sevice.SUBJECT_GETS;
  TEACHER_GETS = this.Model.Sevice.TEACHER_GETS;
  SECTION_GET_STUDENT = this.Model.Sevice.SECTION_GET_STUDENT;
  LECTURE_ROUTINE_GET = this.Model.Sevice.LECTURE_ROUTINE_GET_;;
  SECTION_GETS = this.Model.Sevice.SECTION_GETS;
  STUDENT_ATTENDENCE_SAVE = this.Model.Sevice.STUDENT_ATTENDENCE_SAVE;
  STUDENT_ATTENDENCE_GET = this.Model.Sevice.STUDENT_ATTENDENCE_GET;
   constructor( private http: HttpClient, private router: Router,public dialog: MatDialog
  ,private Model:WebserModel,private datePipe: DatePipe ) {
   }

   Subjectget(data): Observable < any > {
      data.tokenId=this.gettokken;


   console.log(JSON.stringify(data))
    return this.http.post(this.BASE_URL + this.SUBJECT_GETS, data)
  .map(res => < any > res)
  .catch(this.handleError);
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
SectionStudentGet(data): Observable < any >{
  
  data.tokenId=this.gettokken;


  console.log(JSON.stringify(data))
   return this.http.post(this.BASE_URL + this.SECTION_GET_STUDENT, data)
 .map(res => < any > res)
 .catch(this.handleError);
}

StudentAttenceSave(data): Observable < any >{
  
  data.tokenId=this.gettokken;


  console.log(JSON.stringify(data))
   return this.http.post(this.BASE_URL + this.STUDENT_ATTENDENCE_SAVE, data)
 .map(res => < any > res)
 .catch(this.handleError);
}

StudentAttenceGet(data): Observable < any >{
  
  data.tokenId=this.gettokken;


  console.log(JSON.stringify(data))
   return this.http.post(this.BASE_URL + this.STUDENT_ATTENDENCE_GET, data)
 .map(res => < any > res)
 .catch(this.handleError);
}

sectionList(data):Observable <any>{
  
  data.tokenId=this.gettokken;


  console.log(JSON.stringify(data))
   return this.http.post(this.BASE_URL + this.SECTION_GETS, data)
 .map(res => < any > res)
 .catch(this.handleError);
}
LectureGet(): Observable < any >{
  var data ={
    tokenId: this.gettokken,
    teacherId: '1'
  };
  return this.http.post(this.BASE_URL + this.LECTURE_ROUTINE_GET, data)
 .map(res => < any > res)
 .catch(this.handleError);
}
   // Handle Api Errors
  private handleError(error: Response) {
    console.log(error); 
    alert('Some error check inputs and try again.');
    return Observable.throw(error);
  }
}