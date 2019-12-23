import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ColabrationService} from '../../../../main/body/collabration/collabarationweservice'

@Component({
  selector: 'app-branch-dialog',
  templateUrl: './branch-dialog.component.html',
  styleUrls: ['./branch-dialog.component.scss']
})
export class BranchDialogComponent implements OnInit {  registerForm: FormGroup;
  registerFormErrors: any;
  onNoClick(){
    this.dialogRef.close();
  }
  createUser(){
    console.log(JSON.stringify(this.registerForm.value))
 this.WebService.saveBra(this.registerForm.value).subscribe(res=>{
    this.dialogRef.close();
 this.WebService.alertDialog(res.message,'collabration/department/branch');
})
  } 
  updateUser(){
    this.registerForm.value.courseBranchId = this.data.courseBranchId;
    console.log(JSON.stringify(this.registerForm.value))    

    this.WebService.updateBra(this.registerForm.value).subscribe(res=>{
       this.dialogRef.close();
    this.WebService.alertDialog(res.message,'collabration/department/branch');
   })
     }
  constructor( private formBuilder: FormBuilder, public dialogRef: MatDialogRef<BranchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private WebService:ColabrationService ) {
      console.log(JSON.stringify(data))
      if(data.type == 'create'){
        this.createForm();
        for(var i =0 ;i<data.CorsetList.length;i++){
          if(this.WebService.getCoursetId == data.CorsetList[i].courseId){
            this.registerForm.value.courseId = data.CorsetList[i].courseId;
          }
        }
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
    branchName           : ['', Validators.required],
     courseId          : ['', [Validators.required]]

  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
}
updateForm(data){
  this.registerForm = this.formBuilder.group({
     branchName          : [data.branchName, [Validators.required]],
    courseId          : [data.courseId, [Validators.required]]

  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
}
courseList:any;
 
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
