import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ColabrationService} from '../../../../main/body/collabration/collabarationweservice'
import {CommonConstants} from '../../../common/common.constants'
import { ElyNotificationService } from "../../../common/notification.service";
@Component({
  selector: 'app-session-dialog',
  templateUrl: './session-dialog.component.html',
  styleUrls: ['./session-dialog.component.scss']
})
export class SessionDialogComponent implements OnInit {

  registerForm: FormGroup;
  registerFormErrors: any;
  onNoClick(){
    this.dialogRef.close();
  }
  createUser(){
 this.WebService.saveSession(this.registerForm.value).subscribe(res=>{
    this.dialogRef.close();
    this.elyNotificationService.showNotification({ type: CommonConstants.INFO, message: res.message });
})
  }
  updateUser(){
    this.registerForm.value.sessionId = this.data.sessionId;
    this.WebService.updateSession(this.registerForm.value).subscribe(res=>{
       this.dialogRef.close();
       this.elyNotificationService.showNotification({ type: CommonConstants.INFO, message: res.message });
   })
     }
  constructor(private elyNotificationService:ElyNotificationService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<SessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private WebService:ColabrationService ) {
       if(data.type == 'create'){
        this.createForm();
      }else if(data.type == 'update'){
        this.updateForm(data)
      }
    this.registerFormErrors = {
      name           : {},
      email          : {},
      userType:{}
   };

   }
createForm(){
  this.registerForm = this.formBuilder.group({
    startYear           : ['', Validators.required],
    endYear           : ['', Validators.required],

    courseId          : ['', Validators.required]
 
  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
}
updateForm(data){
  this.registerForm = this.formBuilder.group({
    startYear           : [data.startYear, Validators.required],
    endYear           : [data.endYear, Validators.required],

    courseId          : [data.courseId, [Validators.required]]
 
  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
}
CouList:any;
CouLists(){
  var data ={departmentId:this.WebService.getDepartmentId}

  this.WebService.getlistCou(data).subscribe(res => {
     this.CouList = res.data;
 
 })

}
  ngOnInit() {
    this.CouLists();
   }
  onRegisterFormValuesChanged()
  {
      for ( const field in this.registerFormErrors )
      {
          if ( !this.registerFormErrors.hasOwnProperty(field) )
          {
              continue;
          }

          // Clear previous errors
          this.registerFormErrors[field] = {};

          // Get the control
          const control = this.registerForm.get(field);

          if ( control && control.dirty && !control.valid )
          {
              this.registerFormErrors[field] = control.errors;
          }
      }
  }

}
