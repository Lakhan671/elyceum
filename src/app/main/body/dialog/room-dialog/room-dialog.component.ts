import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ColabrationService} from '../../../../main/body/collabration/collabarationweservice'

 
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
  createUser(){
    console.log(JSON.stringify(this.registerForm.value))
 this.WebService.saveRoom(this.registerForm.value).subscribe(res=>{
   alert(JSON.stringify(res));
    this.dialogRef.close();
 this.WebService.alertDialog(res.message,'collabration/department/room/roomName');
})
  } 
  updateUser(){
    this.registerForm.value.courseId = this.data.courseId;
    console.log(JSON.stringify(this.registerForm.value))    

    this.WebService.updateCou(this.registerForm.value).subscribe(res=>{
       this.dialogRef.close();
    this.WebService.alertDialog(res.message,'collabration/department/room/roomName');
   })
     }
  constructor( private formBuilder: FormBuilder, public dialogRef: MatDialogRef<RoomDialogComponent>,
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
