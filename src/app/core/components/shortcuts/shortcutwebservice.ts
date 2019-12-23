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
  import {AlertDialogComponent} from '../../../dialog/alert-dialog/alert-dialog.component';
  import {WebserModel} from '../../../navigation/WebService';

  @Injectable()
  export class ShortcutService {
    userSetdate: any;
    User: any;
    BASE_URL = this.Model.Sevice.BASE_URL;
    CHAT_UNAPPROVED_LIST = this.Model.Sevice.CHAT_UNAPPROVED_LIST;
    CHAT_APPROVED_REQUEST = this.Model.Sevice.CHAT_APPROVED_REQUEST;


     constructor( private _http: HttpClient, private router: Router, public dialog: MatDialog
    , private Model: WebserModel  ) {
     }
     setTokken(token) {
       sessionStorage.setItem('token', token);
     }
     get gettokken() {
       return sessionStorage.getItem('token');
     }
     get getUser() {
      return sessionStorage.getItem('UserId');
    }
        alertDialog(message, state) {

    const dialogRef = this.dialog.open(AlertDialogComponent, {
      height: '350px',
      width: '350px',
      data: { message  }
   });
    dialogRef.afterClosed().subscribe(result => {
     this.router.navigate([state]);
    });
  }

  UnapprovedFriendget(): Observable < any > {

    const data = {
        tokenId: this.gettokken
    };

    return this._http.post(this.BASE_URL + this.CHAT_UNAPPROVED_LIST, data)
    .map(res => res as any)
    .catch(this.handleError);

       }

  approvedfriend(data): Observable < any > {

    data.tokenId = this.gettokken;
    console.log(JSON.stringify(data));
    return this._http.post(this.BASE_URL + this.CHAT_APPROVED_REQUEST, data)
    .map(res => res as any )
    .catch(this.handleError);

       }
    //    rejectfriend(data): Observable < any >{

    //     data.tokenId = this.gettokken;
    //     console.log(JSON.stringify(data))
    //     return this._http.post(this.BASE_URL + this.NEWS_UPDATE, data)
    //     .map(res => < any > res.json())
    //     .catch(this.handleError);

    //        }
    // Handle Api Errors
    private handleError(error: Response) {
      console.log(error);
      console.log('Some error check inputs and try again.');
      return Observable.throw(error);
    }
  }
