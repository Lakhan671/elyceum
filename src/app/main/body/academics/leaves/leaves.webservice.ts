
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
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from '../../../../dialog/alert-dialog/alert-dialog.component';
import { WebserModel } from '../../../../navigation/WebService'
import { DatePipe } from '@angular/common';

@Injectable()
export class LeavesWebService {
  userSetdate: any;
  User: any;
  BASE_URL = this.Model.Sevice.BASE_URL;
  ADD_LEAVE_TYPE = this.Model.Sevice.ADD_LEAVE_TYPE;
  UPDATE_LEAVE_TYPE = this.Model.Sevice.UPDATE_LEAVE_TYPE;
  GET_LEAVE_TYPE = this.Model.Sevice.GET_LEAVE_TYPE;
  GET_LEAVES=this.Model.Sevice.GET_LEAVE;
  UPDATE_LEAVES=this.Model.Sevice.UPADATE_LEAVE;
  ADD_LEAVES=this.Model.Sevice.ADD_LEAVES;
  APPROVE_LEAVES=this.Model.Sevice.LEAVE_APPROVE;
  constructor(private _http: HttpClient, private router: Router, public dialog: MatDialog
    , private Model: WebserModel, private datePipe: DatePipe) {
  }
  get gettokken() {
    return sessionStorage.getItem('token')
  }
  
  addLeaveType(data): Observable<any> {
    data.tokenId = this.gettokken;
    return this._http.post(this.BASE_URL + this.ADD_LEAVE_TYPE, data)
      .map(res => <any>res)
      .catch(this.handleError);
  }
  updateLeaveType(data): Observable<any> {
    data.tokenId = this.gettokken;
    return this._http.post(this.BASE_URL + this.UPDATE_LEAVE_TYPE, data)
      .map(res => <any>res)
      .catch(this.handleError);
  }

  getLeaveType(): Observable<any> {
   let data={tokenId :this.gettokken}
    return this._http.post(this.BASE_URL + this.GET_LEAVE_TYPE, data)
      .map(res => <any>res)
      .catch(this.handleError);
  }

  getLeaves(data): Observable<any> {
      data.tokenId=this.gettokken;
     return this._http.post(this.BASE_URL + this.UPDATE_LEAVES, data)
       .map(res => <any>res)
       .catch(this.handleError);
   }

   updareLeaves(data): Observable<any> {
    data.tokenId=this.gettokken;
   return this._http.post(this.BASE_URL + this.UPDATE_LEAVES, data)
     .map(res => <any>res)
     .catch(this.handleError);
 }
 addLeaves(data): Observable<any> {
  data.tokenId=this.gettokken;
 return this._http.post(this.BASE_URL + this.ADD_LEAVES, data)
   .map(res => <any>res)
   .catch(this.handleError);
}
approveLeave(data){
data.tokenId=this.gettokken;
return this._http.post(this.BASE_URL + this.APPROVE_LEAVES, data)
  .map(res => <any>res)
  .catch(this.handleError);
}
  // Handle Api Errors
  private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }
}