import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ColabrationService} from '../../../../main/body/collabration/collabarationweservice'

@Component({
  selector: 'app-section-dialog',
  templateUrl: './section-dialog.component.html',
  styleUrls: ['./section-dialog.component.scss']
})
export class SectionDialogComponent implements OnInit {  registerForm: FormGroup;
  registerFormErrors: any;
  onNoClick(){
    this.dialogRef.close();
  }
  createUser(){
  this.WebService.saveSection(this.registerForm.value).subscribe(res=>{
    this.dialogRef.close();
 this.WebService.alertDialog(res.message,'collabration/department/section');
})
  }
  constructor( private formBuilder: FormBuilder, public dialogRef: MatDialogRef<SectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private WebService:ColabrationService ) {
      if(data.type == 'create'){
        this.createForm();
      }else if(data.type == 'update'){
        this.updateForm(data);
      }
    this.registerFormErrors = {
      name           : {},
      email          : {},
      userType:{}
   };

   }
   updateForm(data){
    this.registerForm = this.formBuilder.group({
      sectionName           : [data.sectionName, Validators.required],
      roomId          : [data.roomId, [Validators.required]],
      semesterId          : [data.semesterId, [Validators.required]]
  
    });
  
  this.registerForm.valueChanges.subscribe(() => {
      this.onRegisterFormValuesChanged();
  });
   }
createForm(){
  this.registerForm = this.formBuilder.group({
    sectionName           : ['', Validators.required],
    roomId          : ['', [Validators.required]],
    semesterId          : ['', [Validators.required]]

  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
}
roomList:any;
RoomListget(){
   this.WebService.getlistRoomList().subscribe(res=>{
    this.roomList = res.data;
   })
 }
 semList:any;
semListget(){
  var data = {
    courseBranchId:this.WebService.getCoursetId  
  }
   this.WebService.getlistSem(data).subscribe(res=>{
    this.semList = res.data;
    })
 }
  ngOnInit() {
    this.RoomListget();
    this.semListget();
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
