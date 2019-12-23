 
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
  export class SubjectService {
    userSetdate: any;
    User: any;
    LESSION_DETAIL_GET = this.Model.Sevice.LESSION_DETAIL_GET;
    BASE_URL = this.Model.Sevice.BASE_URL;
    CATEGORY_GETS = this.Model.Sevice.CATEGORY_GETS;
    CATEGORY_SAVE = this.Model.Sevice.CATEGORY_SAVE;
    TEACHER_GET = this.Model.Sevice.TEACHER_GETS;
    SUBJECT_SAVE = this.Model.Sevice.SUBJECT_SAVE;
    SUBJECT_UPDATE = this.Model.Sevice.SUBJECT_UPDATE;
    SUBJECT_GETS = this.Model.Sevice.SUBJECT_GETS;
    SUBJECT_NOTES_SAVE = this.Model.Sevice.SUBJECT_NOTES_SAVE;
    SUBJECT_NOTES_GET = this.Model.Sevice.SUBJECT_NOTES_GET
    SUBJECT_NOTES_DELETES = this.Model.Sevice.SUBJECT_NOTES_DELETES
    UNIT_GET = this.Model.Sevice.UNIT_GET
    LESSON_CREATE = this.Model.Sevice.LESSON_CREATE
    LESSON_GET = this.Model.Sevice.LESSON_GET
    ASSIGNMENT_ADD = this.Model.Sevice.ASSIGNMENT_ADD
    LESSION_STATUS_POST = this.Model.Sevice.LESSION_STATUS_POST;
    ASSIGNMENT_UPDATE = this.Model.Sevice.ASSIGNMENT_UPDATE

    ASSIGNMENT_GET = this.Model.Sevice.ASSIGNMENT_GET

    ASSIGNMENT_QUESTION_ADD = this.Model.Sevice.ASSIGNMENT_QUESTION_ADD

    ASSIGNMENT_QUESTION_GET = this.Model.Sevice.ASSIGNMENT_QUESTION_GET
    ASSIGNMENT_QUESTION_UPDATE = this.Model.Sevice.ASSIGNMENT_QUESTION_UPDATE
    ASSIGNMENT_QUESTION_STAR_ADD = this.Model.Sevice.ASSIGNMENT_QUESTION_STAR_ADD
    ASSIGNMENT_QUESTION_STAR_UPDATE = this.Model.Sevice.ASSIGNMENT_QUESTION_STAR_UPDATE
    ASSIGNMENT_QUESTION_STAR_GET = this.Model.Sevice.ASSIGNMENT_QUESTION_STAR_GET

     
        constructor( private _http: HttpClient, private router: Router,public dialog: MatDialog
    ,private Model:WebserModel,private datePipe: DatePipe ) {
     }
     //Assignment Service
     AssignmentSave(data): Observable < any > {
      data.tokenId=this.gettokken; 
        return this._http.post(this.BASE_URL + this.ASSIGNMENT_ADD, data)
     .map(res => < any > res)
     .catch(this.handleError);
    }
    AssignmentGet(data): Observable < any > {
      data.tokenId=this.gettokken;
       
  
      console.log(JSON.stringify(data))
       return this._http.post(this.BASE_URL + this.ASSIGNMENT_GET, data)
     .map(res => < any > res)
     .catch(this.handleError);
    }
    LessionPostStatus(data):Observable<any>{ 
      data.lessionId = this.gettlessionId.lessionId;
      data.tokenId = this.gettokken;
        return this._http.post(this.BASE_URL + this.LESSION_STATUS_POST, data)
     .map(res => < any > res)
     .catch(this.handleError);

    }
    
    LessionDetail(data):Observable<any>{ 
      data.lessionId = this.gettlessionId.lessionId;
      data.tokenId = this.gettokken;
        return this._http.post(this.BASE_URL + this.LESSION_DETAIL_GET, data)
     .map(res => < any > res)
     .catch(this.handleError);

    }
    AssignmentUpdate(data): Observable < any > {
      data.tokenId=this.gettokken;
       
  
      console.log(JSON.stringify(data))
       return this._http.post(this.BASE_URL + this.ASSIGNMENT_UPDATE, data)
     .map(res => < any > res)
     .catch(this.handleError);
    }
    AssignmentQuestionADD(data): Observable < any > {
      data.tokenId=this.gettokken;
       
  
      console.log(JSON.stringify(data))
       return this._http.post(this.BASE_URL + this.ASSIGNMENT_QUESTION_ADD, data)
     .map(res => < any > res)
     .catch(this.handleError);
    }
    AssignmentQuestionGet( ): Observable < any > {
      let data = {
        tokenId:this.gettokken,
        unitAsId:this.gettunitId.unitId
      }
      
     
  
     
       return this._http.post(this.BASE_URL + this.ASSIGNMENT_QUESTION_GET, data)
     .map(res => < any > res)
     .catch(this.handleError);
    }
    AssignmentQuestionupdate(data): Observable < any > {
      data.tokenId=this.gettokken;
      
  
      console.log(JSON.stringify(data))
       return this._http.post(this.BASE_URL + this.ASSIGNMENT_QUESTION_UPDATE, data)
     .map(res => < any > res)
     .catch(this.handleError);
    }
    AssignmentStarupdate(data): Observable < any > {
      data.tokenId=this.gettokken;
    
  
      console.log(JSON.stringify(data))
       return this._http.post(this.BASE_URL + this.ASSIGNMENT_QUESTION_STAR_UPDATE, data)
     .map(res => < any > res)
     .catch(this.handleError);
    }
    AssignmentStarAdd(data): Observable < any > {
      data.tokenId=this.gettokken;
     
  
      console.log(JSON.stringify(data))
       return this._http.post(this.BASE_URL + this.ASSIGNMENT_QUESTION_STAR_ADD, data)
     .map(res => < any > res)
     .catch(this.handleError);
    }
    AssignmentStarget(data): Observable < any > {
      data.tokenId=this.gettokken;  
  
      console.log(JSON.stringify(data))
       return this._http.post(this.BASE_URL + this.ASSIGNMENT_QUESTION_STAR_GET, data)
     .map(res => < any > res)
     .catch(this.handleError);
    }
    // End of Assignment Service
     setTokken(token){
       sessionStorage.setItem('token',token);
     }
     get gettokken(){
       return sessionStorage.getItem('token')
     }    

     setProjectId(data){
      sessionStorage.setItem('ProjectId',JSON.stringify(data));
    }
    setLession(data){
      sessionStorage.setItem('lession',JSON.stringify(data));
    }
    get  gettlessionId(){
      return JSON.parse(sessionStorage.getItem('lession'));
     }
    setunitId(data){
      sessionStorage.setItem('unitId',JSON.stringify(data));
    }
    get  gettunitId(){
      return JSON.parse(sessionStorage.getItem('unitId'));
     }
    get  gettasktId(){
     return JSON.parse(sessionStorage.getItem('taskId'));
    }
    setTasktId(data){
      sessionStorage.setItem('taskId',JSON.stringify(data));
    }
    get  getProjectId(){
     return JSON.parse(sessionStorage.getItem('ProjectId'));
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
 
getcategorylistSem(): Observable < any > {
  var data ={tokenId:this.gettokken} 
  console.log(JSON.stringify(data))
   return this._http.post(this.BASE_URL + this.CATEGORY_GETS, data)
 .map(res => < any > res)
 .catch(this.handleError);
}
getteacherlistSem(): Observable < any > {
    var data ={tokenId:this.gettokken} 
    console.log(JSON.stringify(data))
     return this._http.post(this.BASE_URL + this.TEACHER_GET, data)
   .map(res => < any > res)
   .catch(this.handleError);
  }
categorySave(data): Observable < any > {
    data.tokenId=this.gettokken;
  

    console.log(JSON.stringify(data))
     return this._http.post(this.BASE_URL + this.CATEGORY_SAVE, data)
   .map(res => < any > res)
   .catch(this.handleError);
  }
  SubjectSave(data): Observable < any > {
    data.tokenId=this.gettokken;
 
    console.log(JSON.stringify(data))
     return this._http.post(this.BASE_URL + this.SUBJECT_SAVE, data)
   .map(res => < any > res)
   .catch(this.handleError);
  }
  SubjectUpdate(data): Observable < any > {
    data.tokenId=this.gettokken;
 
    console.log(JSON.stringify(data))
     return this._http.post(this.BASE_URL + this.SUBJECT_UPDATE, data)
   .map(res => < any > res)
   .catch(this.handleError);
  }

  Subjectget(data): Observable < any > {
       data.tokenId=this.gettokken;

 
    console.log(JSON.stringify(data))
     return this._http.post(this.BASE_URL + this.SUBJECT_GETS, data)
   .map(res => < any > res)
   .catch(this.handleError);
  }
  notesSave(data): Observable < any > {
    data.tokenId=this.gettokken;
    console.log(JSON.stringify(data))

    console.log(JSON.stringify(this.BASE_URL + this.SUBJECT_NOTES_SAVE))
     return this._http.post(this.BASE_URL + this.SUBJECT_NOTES_SAVE, data)
   .map(res => < any > res)
   .catch(this.handleError);
  }
  notesGET(): Observable < any > {
    var data = {tokenId:this.gettokken,
      subjectId:this.getProjectId.subjectId
    } 
         return this._http.post(this.BASE_URL + this.SUBJECT_NOTES_GET, data)
   .map(res => < any > res)
   .catch(this.handleError);
  }
  notesUpdate(data): Observable < any > {
    data.tokenId = this.gettokken;
     
         return this._http.post(this.BASE_URL + this.SUBJECT_NOTES_GET, data)
   .map(res => < any > res)
   .catch(this.handleError);
  }
  notesDelete(data): Observable < any > {
    data.tokenId=this.gettokken;
    console.log(JSON.stringify(data))

    console.log(JSON.stringify(data))
     return this._http.post(this.BASE_URL + this.SUBJECT_NOTES_DELETES, data)
   .map(res => < any > res)
   .catch(this.handleError);
  }

  UnitGet(data): Observable < any > {
    data.tokenId=this.gettokken;
 
      return this._http.post(this.BASE_URL + this.UNIT_GET, data)
   .map(res => < any > res)
   .catch(this.handleError);
  }
  LessonGet(data): Observable < any > {
    data.tokenId=this.gettokken;
 
      return this._http.post(this.BASE_URL + this.LESSON_GET, data)
   .map(res => < any > res)
   .catch(this.handleError);
  }
  LessonSave(data): Observable < any > {
    data.tokenId=this.gettokken;
 console.log(JSON.stringify(data))
      return this._http.post(this.BASE_URL + this.LESSON_CREATE, data)
   .map(res => < any > res)
   .catch(this.handleError);
  }
    private handleError(error: Response) {
      console.log(error); 
       return Observable.throw(error);
    }
  }