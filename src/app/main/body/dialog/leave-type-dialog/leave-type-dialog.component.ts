import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Alert } from 'selenium-webdriver';
import {CommonConstants} from '../../../common/common.constants'
import { ElyNotificationService } from "../../../common/notification.service";
import { LeavesWebService } from 'src/app/main/body/academics/leaves/leaves.webservice';


@Component({
  selector: 'app-leave-type-dialog',
  templateUrl: './leave-type-dialog.component.html',
  styleUrls: ['./leave-type-dialog.component.scss']
})
export class LeaveTypeDialogComponent implements OnInit {

  registerFormErrors: any;
 leaveType: string='';
  onNoClick() {
    this.dialogRef.close();
  }
  constructor(private leaveService:LeavesWebService,private elyNotificationService:ElyNotificationService, public dialogRef: MatDialogRef<LeaveTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.data = data;
    if (data.type == 'create') {
     
    } else {
    }
  }
  public addLeaveType():void{
   let data={
   }
    this.leaveService.addLeaveType(data).subscribe(res => {
      this.dialogRef.close();
      this.elyNotificationService.showNotification({type:CommonConstants.INFO,message:res.message});
    });
  }
  public updateLeaveType(data):void{
     this.leaveService.updateLeaveType(data).subscribe(res => {
       this.dialogRef.close();
       this.elyNotificationService.showNotification({type:CommonConstants.INFO,message:res.message});
     });
  }

  ngOnInit() {
  }

}
