import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import  {feeWebService} from '../../academics/fee/feeWebservice' 
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-fee-type-dialog',
  templateUrl: './fee-type-dialog.component.html',
  styleUrls: ['./fee-type-dialog.component.scss']
})
export class FeeTypeDialogComponent implements OnInit {

  registerForm: FormGroup;
  registerFormErrors: any;
  onNoClick(){
    this.dialogRef.close();
  }
  createUser(){
 
  }

  friendLisst:any;

  constructor( private formBuilder: FormBuilder, public dialogRef: MatDialogRef<FeeTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,private webservice:feeWebService ) { 
      if(data.type =='create'){
        this.creatememberForm();
      }

   }
   creatememberForm(){
    this.registerForm = this.formBuilder.group({
      instalmentType           : ['', Validators.required],
     
  
    });
   }
   updatememberForm(data){
    this.registerForm = this.formBuilder.group({
      instalmentType           : ['', Validators.required],
     
  
    });
   }
   
   AddFeeType(){ 
     alert(JSON.stringify(this.registerForm.value));
     this.webservice.SavefeeType(this.registerForm.value).subscribe(res=>{
       alert(JSON.stringify(res))
     })
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
