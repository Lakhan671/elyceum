import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Alert } from 'selenium-webdriver';
import { CommonConstants } from '../../../common/common.constants'
import { ElyNotificationService } from "../../../common/notification.service";
import { LeavesWebService } from 'src/app/main/body/academics/leaves/leaves.webservice';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-leave-type-dialog',
  templateUrl: './leave-type-dialog.component.html',
  styleUrls: ['./leave-type-dialog.component.scss']
})
export class LeaveTypeDialogComponent implements OnInit {

  registerFormErrors: any;
  leaveType: string = '';
  leave = {
    title: '',
    text: '',
    from: '',
    to: '',
    leaveType: ''
  }
  leaveTypes: any;
  onNoClick() {
    this.dialogRef.close();
  }
  constructor(private datePipe: DatePipe, private leaveService: LeavesWebService, private elyNotificationService: ElyNotificationService, public dialogRef: MatDialogRef<LeaveTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.data = data;
    if (data.action == 'update') {
      this.leaveType = this.data.type;
      this.leave.leaveType = data.leave.leaveType;
      this.leave.title = data.leave.title;
      this.leave.text = data.leave.text;
      this.leave.to = this.datePipe.transform(data.leave.to, 'MM/dd/yyyy');
      this.leave.from = this.datePipe.transform(data.leave.from, 'MM/dd/yyyy');
      console.log(this.data);
    }
  }

  public addLeaveType(): void {
    let sickLeaveDate = new Date();
    let data = {
      createdDate: sickLeaveDate,
      updatedDate: sickLeaveDate,
      type: this.leaveType
    }
    this.leaveService.addLeaveType(data).subscribe(res => {
      this.dialogRef.close();
      this.elyNotificationService.showNotification({ type: CommonConstants.INFO, message: res.message });
    });
  }

  public updateLeaveType(): void {
    this.data.type = this.leaveType;
    this.leaveService.updateLeaveType(this.data).subscribe(res => {
      this.dialogRef.close();
      this.elyNotificationService.showNotification({ type: CommonConstants.INFO, message: res.message });
    });
  }
  addLeave(leave) {
    leave.to = this.datePipe.transform(leave.to, CommonConstants.YYY_MM_DD_HH_MM_SS);
    leave.from = this.datePipe.transform(leave.from, CommonConstants.YYY_MM_DD_HH_MM_SS);
    leave.date = this.datePipe.transform(new Date(), CommonConstants.YYY_MM_DD_HH_MM_SS);
    this.leaveService.addLeaves(leave).subscribe(res => {
      this.dialogRef.close();
      this.elyNotificationService.showNotification({ type: CommonConstants.SUCCESS, message: res.message });
    });
  }
  getLeaveType() {
    this.leaveService.getLeaveType().subscribe(res => {
      this.leaveTypes = res.data;
    })
  }
  updateLeave(leave) {
    leave.id = this.data.leave.id;
    leave.to = this.datePipe.transform(leave.to, CommonConstants.YYY_MM_DD_HH_MM_SS);
    leave.from = this.datePipe.transform(leave.from, CommonConstants.YYY_MM_DD_HH_MM_SS);
    leave.date = this.datePipe.transform(new Date(), CommonConstants.YYY_MM_DD_HH_MM_SS);
    this.leaveService.updareLeaves(leave).subscribe(res => {
      this.data.leave.leaveType = leave.leaveType
      this.data.leave.title = this.leave.title;
      this.data.leave.text = this.leave.text;
      this.data.leave.to = leave.to;
      this.data.leave.from =leave.from;

      this.dialogRef.close();
      this.elyNotificationService.showNotification({ type: CommonConstants.SUCCESS, message: res.message });
    });

  }
  ngOnInit() {
    this.getLeaveType();
  }

}
