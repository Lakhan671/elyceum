import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { feeWebService } from '../../academics/fee/feeWebservice'
import { Alert } from 'selenium-webdriver';
import {CommonConstants} from '../../../common/common.constants'
import { ElyNotificationService } from "../../../common/notification.service";

@Component({
  selector: 'app-fee-type-dialog',
  templateUrl: './fee-type-dialog.component.html',
  styleUrls: ['./fee-type-dialog.component.scss']
})
export class FeeTypeDialogComponent implements OnInit {

  registerForm: FormGroup;
  registerFormErrors: any;
 // data: any;
  onNoClick() {
    this.dialogRef.close();
  }

  constructor(private elyNotificationService:ElyNotificationService,private formBuilder: FormBuilder, public dialogRef: MatDialogRef<FeeTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private webservice: feeWebService) {
    this.data = data;
    if (data.type == 'create') {
      this.creatememberForm();
    } else {
      this.updatememberForm(data);
    }
  }
  creatememberForm() {
    this.registerForm = this.formBuilder.group({
      instalmentType: ['', Validators.required],


    });
  }
  updatememberForm(data) {
    this.registerForm = this.formBuilder.group({
      instalmentType: [data.instalmentType, Validators.required],


    });
  }

  addFeeType() {
    this.webservice.SavefeeType(this.registerForm.value).subscribe(res => {
      this.dialogRef.close();
      this.elyNotificationService.showNotification({type:CommonConstants.INFO,message:res.message});
    })
  }
  updateFeeType(data) {
    this.registerForm.value.instalmentTypeId=this.data.instalmentTypeId;
    this.webservice.updateFeeType(this.registerForm.value).subscribe(res => {
      this.dialogRef.close();
      this.elyNotificationService.showNotification({type:CommonConstants.INFO,message:res.message});
    })
  }

  ngOnInit() {
  }

  onRegisterFormValuesChanged() {
    for (const field in this.registerFormErrors) {
      if (!this.registerFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.registerFormErrors[field] = {};

      // Get the control
      const control = this.registerForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.registerFormErrors[field] = control.errors;
      }
    }
  }


}
