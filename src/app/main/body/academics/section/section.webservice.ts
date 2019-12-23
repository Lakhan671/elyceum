 
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
  export class SecionService {
    userSetdate: any;
    User: any;
    BASE_URL = this.Model.Sevice.BASE_URL;
    DEP_LIST_GET  = this.Model.Sevice.DEP_LIST_GET;
    COURSE_GET = this.Model.Sevice.COURSE_GET;
    BRANCH_LIST = this.Model.Sevice.BRANCH_LIST;
    SESSiON_GETS = this.Model.Sevice.SESSiON_GETS;
    SEMISTER_GETS = this.Model.Sevice.SEMISTER_GETS;
    STUDENT_SAVE =this.Model.Sevice.STUDENT_SAVE;
    STUDENT_GETS =this.Model.Sevice.STUDENT_GETS;
    SECTION_GETS = this.Model.Sevice.SECTION_GETS;
    SECTION_ADD_STUDENT = this.Model.Sevice.SECTION_ADD_STUDENT;
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
  getSectionlist(data): Observable < any > {
    data.tokenId=this.gettokken
     
   return this._http.post(this.BASE_URL + this.SECTION_GETS, data)
   .map(res => < any > res)
   .catch(this.handleError);
}
AddSectionstudentlist(data): Observable < any > {
    console.log(JSON.stringify(data));
 return this._http.post(this.BASE_URL + this.SECTION_ADD_STUDENT, data)
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
getlistStudent(data): Observable < any > {
  data.tokenId=this.gettokken;
 console.log(JSON.stringify(data))
 return this._http.post(this.BASE_URL + this.STUDENT_GETS, data)
 .map(res => < any > res)
 .catch(this.handleError);
}
saveStudent(data): Observable < any > {
  data.addmissionDate=    this.datePipe.transform(data.addmissionDate, 'yyyy-MM-dd HH:MM:SS');
  data.currentYear=    this.datePipe.transform(data.currentYear, 'yyyy-MM-dd HH:MM:SS');

  data.tokenId=this.gettokken;
 console.log(JSON.stringify(data))
 return this._http.post(this.BASE_URL + this.STUDENT_SAVE, data)
 .map(res => < any > res)
 .catch(this.handleError);
}
getlistBran(data): Observable < any > {
  data.tokenId=this.gettokken;
  return this._http.post(this.BASE_URL + this.BRANCH_LIST, data)
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
getlistSem(data): Observable < any > {
  data.tokenId=this.gettokken;
  console.log(JSON.stringify(data))
   return this._http.post(this.BASE_URL + this.SEMISTER_GETS, data)
 .map(res => < any > res)
 .catch(this.handleError);
}
    private handleError(error: Response) {
      console.log(error); 
       return Observable.throw(error);
    }
  }