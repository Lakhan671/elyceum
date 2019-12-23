import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ColabrationService} from '../../../../main/body/collabration/collabarationweservice'
import { ElyNotificationService } from "../../../common/notification.service";
import { CommonConstants } from '../../../common/common.constants'
 
@Component({
  selector: 'app-room-dialog',
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.scss']
})
export class RoomDialogComponent implements OnInit {  registerForm: FormGroup;
  registerFormErrors: any;
  onNoClick(){
    this.dialogRef.close();
  }
  createRoom(){
    console.log(JSON.stringify(this.registerForm.value))
 this.WebService.saveRoom(this.registerForm.value).subscribe(res=>{
    this.dialogRef.close();
    this.elyNotificationService.showNotification({type:CommonConstants.INFO,message:res.message});
})
  } 
  updateRoom(){
    this.registerForm.value.roomId = this.data.roomId;
    console.log(JSON.stringify(this.registerForm.value))    

    this.WebService.updateRoom(this.registerForm.value).subscribe(res=>{
       this.dialogRef.close();
       this.elyNotificationService.showNotification({type:CommonConstants.INFO,message:res.message});
   })
     }
  constructor(private elyNotificationService:ElyNotificationService , private formBuilder: FormBuilder, public dialogRef: MatDialogRef<RoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private WebService:ColabrationService ) {
      console.log(JSON.stringify(data))
      if(data.type == 'create'){
        this.createForm();
      }else if(data.type == 'update') {
        this.updateForm(data);
      }
    this.registerFormErrors = {
      name           : {},
      email          : {},
      userType:{}
   };

   }
createForm(){
  this.registerForm = this.formBuilder.group({
    roomName           : ['', Validators.required],
    roomTypeId          : ['', [Validators.required]]
 
  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
}
updateForm(data){
  this.registerForm = this.formBuilder.group({
    roomName           : [data.roomName, Validators.required],
    roomTypeId          : [data.roomTypeId, [Validators.required]]
 
  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
}
depList:any;
 
  ngOnInit() {
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
