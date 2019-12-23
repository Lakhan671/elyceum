 
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
    @Injectable()
  export class WebService {
    userSetdate: any;
    User: any;
    BASE_URL = this.Model.Sevice.BASE_URL;
    GET_COLLEGE_DETAIL  = this.Model.Sevice.GET_COLLEGE_DETAIL;
    GET_COLLEGE_UPDATE =this.Model.Sevice.GET_COLLEGE_UPDATE
     constructor( private _http: HttpClient, private router: Router,public dialog: MatDialog
    ,private Model:WebserModel ) {
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
  
    getCollege(): Observable < any > {
        var data  = {
            tokenId:this.gettokken
        }
       return this._http.post(this.BASE_URL + this.GET_COLLEGE_DETAIL, data)
       .map(res => < any > res)
       .catch(this.handleError);
   }
   saveCollege(data): Observable < any >{
data.tokenId = this.gettokken;
return this._http.post(this.BASE_URL + this.GET_COLLEGE_UPDATE, data)
.map(res => < any > res)
.catch(this.handleError);

   }
    // Handle Api Errors
    private handleError(error: Response) {
      console.log(error);
       return Observable.throw(error);
    }
  }