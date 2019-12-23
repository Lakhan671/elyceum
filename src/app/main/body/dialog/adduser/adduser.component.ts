import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {WebService} from '../../../../core/services/webservice'
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  registerForm: FormGroup;
  registerFormErrors: any;
  onNoClick(){
    this.dialogRef.close();
  }
  createUser(){
 this.WebService.addUser(this.registerForm.value).subscribe(res=>{
   this.dialogRef.close();
 this.WebService.alertDialog(res.message,'settings/student');
})
  }
  constructor( private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AdduserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private WebService:WebService ) {
      if(data.type == 'create'){
        this.createForm();
      }else if(data.type == 'update'){

      }
    this.registerFormErrors = {
      name           : {},
      email          : {},
      userType:{}
   };

   }
createForm(){
  this.registerForm = this.formBuilder.group({
    name           : ['', Validators.required],
    email          : ['', [Validators.required, Validators.email]],
    usertype          : ['', [Validators.required]],

  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
}
usertypeList:any;
userTypeList(){
  this.WebService.getUserType().subscribe(res=>{
    alert(JSON.stringify(res));
this.usertypeList = res.data;
  })
}
  ngOnInit() {
    this.userTypeList();
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
