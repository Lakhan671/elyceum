import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
 import {SubjectService} from '../../subject/SubjectWebservice'
@Component({
  selector: 'app-assignment-dialog',
  templateUrl: './assignment-dialog.component.html',
  styleUrls: ['./assignment-dialog.component.scss']
})
export class AssignmentDialogComponent implements OnInit {


  registerForm: FormGroup;
  registerFormErrors: any;
  onNoClick(){
    this.dialogRef.close();
  }
  createUser(){
 
  }

  friendLisst:any;
update:boolean;
  constructor( private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AssignmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private webService:SubjectService  ) { 
      if(data.type == 'create'){
        this.update = false;
        this.creatememberForm();
      }else{
        this.update = true;
        this.updatememberForm(data.data)
      }
   }
   creatememberForm(){
    this.registerForm = this.formBuilder.group({
      title           : ['', Validators.required],
      description           : ['', Validators.required],

  
    });
    this.registerForm.valueChanges.subscribe(() => {
      this.onRegisterFormValuesChanged();
  });
  
   }
   updatememberForm(data){
    this.registerForm = this.formBuilder.group({
      title           : [data.title, Validators.required],
      description           : [data.description, Validators.required],
     
  
    });
    this.registerForm.valueChanges.subscribe(() => {
      this.onRegisterFormValuesChanged();
  });
  
   }
   Addmember(){ 
    this.registerForm.value.unitId = this.webService.gettunitId.unitId;
      this.webService.AssignmentSave(this.registerForm.value).subscribe(res=>{
        this.dialogRef.close();
        this.webService.alertDialog(res.data.message,'subject/Detail/Unit/assignment')
     })
   }
   Updateember(){ 
    this.registerForm.value.unitId = this.webService.gettunitId.unitId;
    this.registerForm.value.unitAsId = this.data.data.unitAsId
      this.webService.AssignmentUpdate(this.registerForm.value).subscribe(res=>{
        this.dialogRef.close();
        this.webService.alertDialog(res.data.message,'subject/Detail/Unit/assignment')
     })
   }
   getFriendList (){ 
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
