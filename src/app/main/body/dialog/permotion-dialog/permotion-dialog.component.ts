import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
 import {StudentService} from '../../student/studentWebservice'
@Component({
  selector: 'app-permotion-dialog',
  templateUrl: './permotion-dialog.component.html',
  styleUrls: ['./permotion-dialog.component.scss']
})
export class PermotionDialogComponent implements OnInit {
  registerForm: FormGroup;
  registerFormErrors: any;
  onNoClick(){
    this.dialogRef.close();
  }
  createUser(){
this.webService.permotiontypeSave(this.registerForm.value).subscribe(res=>{
  this.dialogRef.close();
 this.webService.alertDialog(res.message,'student/Permotion/type')
})
   }
  constructor( private webService:StudentService,private formBuilder: FormBuilder, public dialogRef: MatDialogRef<PermotionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any   ) {
       if(data.type == 'create'){
        this.createForm();
      }else if(data.type == 'update'){
        this.updateForm(data.data);

      }
    this.registerFormErrors = {
      name           : {},
      email          : {},
      userType:{}
   };

   }
   updatetypePermotion(){
     this.registerForm.value.permotionTypeId = this.data.data.permotionTypeId;
     this.webService.permotiontypeUpdate(this.registerForm.value).subscribe(res=>{
      this.dialogRef.close();
      this.webService.alertDialog(res.message,'student/Permotion/type')
     
     })
   }
   updateForm(data){

  this.registerForm = this.formBuilder.group({
    permotionType           : [data.permotionType, Validators.required],
 
  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
   }
createForm(){
  this.registerForm = this.formBuilder.group({
    permotionType           : ['', Validators.required],
 
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
