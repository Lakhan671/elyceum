import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ColabrationService} from '../../../../main/body/collabration/collabarationweservice'

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentDialogComponent implements OnInit {

  registerForm: FormGroup;
  registerFormErrors: any;
  onNoClick(){
    this.dialogRef.close();
  }
  createUser(){
 this.WebService.saveDep(this.registerForm.value).subscribe(res=>{
    this.dialogRef.close();
 this.WebService.alertDialog(res.message,'collabration/department');
})
  }
  updateUser(){
    this.registerForm.value.departmentId = this.data.departmentId;
    this.WebService.updateDep(this.registerForm.value).subscribe(res=>{
       this.dialogRef.close();
    this.WebService.alertDialog(res.message,'collabration/department');
   })
     }
  constructor( private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DepartmentDialogComponent>,
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
    departmentName           : ['', Validators.required],
    description          : ['', [Validators.required]]
 
  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
}
updateForm(data){
  this.registerForm = this.formBuilder.group({
    departmentName           : [data.departmentName, Validators.required],
    description          : [data.description, [Validators.required]]
 
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
