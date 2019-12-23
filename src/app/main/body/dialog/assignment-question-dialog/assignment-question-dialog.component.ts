import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
 
@Component({
  selector: 'app-assignment-question-dialog',
  templateUrl: './assignment-question-dialog.component.html',
  styleUrls: ['./assignment-question-dialog.component.scss']
})
export class AssignmentQuestionDialogComponent implements OnInit {


  registerForm: FormGroup;
  registerFormErrors: any;
  onNoClick(){
    this.dialogRef.close();
  }
  createUser(){
 
  }

  friendLisst:any;

  constructor( private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AssignmentQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  ) { 

   }
   creatememberForm(){
    this.registerForm = this.formBuilder.group({
      userId           : ['', Validators.required],
     
  
    });
   }
   updatememberForm(data){
    this.registerForm = this.formBuilder.group({
      userId           : ['', Validators.required],
     
  
    });
   }
   Addmember(){ 
   }
   getFriendList (){ 
   }
createForm(){
  this.registerForm = this.formBuilder.group({
    groupName           : ['', Validators.required],
   

  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
} 
updateForm(data){
  this.registerForm = this.formBuilder.group({
    groupName           : [data.title, Validators.required],
   

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
