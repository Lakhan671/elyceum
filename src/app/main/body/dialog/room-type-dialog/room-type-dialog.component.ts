import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ColabrationService} from '../../../../main/body/collabration/collabarationweservice'

@Component({
  selector: 'app-room-type-dialog',
  templateUrl: './room-type-dialog.component.html',
  styleUrls: ['./room-type-dialog.component.scss']
})
export class RoomTypeDialogComponent implements OnInit {

  registerForm: FormGroup;
  registerFormErrors: any;
  onNoClick(){
    this.dialogRef.close();
  }
  createUser(){
    alert(JSON.stringify(this.registerForm.value))
 this.WebService.saveRoomType(this.registerForm.value).subscribe(res=>{
     this.dialogRef.close();
 this.WebService.alertDialog(res.message,'collabration/department/room');
})
  }
  updateUser(){
    this.registerForm.value.roomTypeId = this.data.roomTypeId;
     this.WebService.updateRoomType(this.registerForm.value).subscribe(res=>{
       this.dialogRef.close();
    this.WebService.alertDialog(res.message,'collabration/department/room');
   })
     }
  constructor( private formBuilder: FormBuilder, public dialogRef: MatDialogRef<RoomTypeDialogComponent>,
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
    roomType           : ['', Validators.required],
  
  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
}
updateForm(data){
  this.registerForm = this.formBuilder.group({
    roomType           : [data.roomType, Validators.required],
  
  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
}
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
