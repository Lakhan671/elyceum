import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ColabrationService} from '../../../../main/body/collabration/collabarationweservice'
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-semister-dialog',
  templateUrl: './semister-dialog.component.html',
  styleUrls: ['./semister-dialog.component.scss']
})
export class SemisterDialogComponent implements OnInit {

  registerForm: FormGroup;
  registerFormErrors: any;
  onNoClick(){
    this.dialogRef.close();
  }
  createUser(){
    this.registerForm.value.semStartDate = this.startDate;
    this.registerForm.value.semEndDate = this.endDate;

   this.WebService.saveSem(this.registerForm.value).subscribe(res=>{
    this.dialogRef.close();
 this.WebService.alertDialog(res.message,'collabration/department/semister');
});
  }
  updateUser(){
    this.registerForm.value.semStartDate = this.startDate;
    this.registerForm.value.semEndDate = this.endDate;
    this.registerForm.value.semesterId = this.data.data.semesterId;
 
    this.WebService.updateSem(this.registerForm.value).subscribe(res=>{
       this.dialogRef.close();
    this.WebService.alertDialog(res.message,'collabration/department/semister');
   })
     }
  constructor( private formBuilder: FormBuilder, public dialogRef: MatDialogRef<SemisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private WebService:ColabrationService ) {
       if(data.type == 'create'){
        this.createForm();
      }else if(data.type == 'update'){
        this.updateForm(data.data)
      }
    this.registerFormErrors = {
      name           : {},
      email          : {},
      userType:{}
   };

   }
createForm(){
  this.registerForm = this.formBuilder.group({
    semesterName           : ['', Validators.required],
    courseBranchId          : ['', [Validators.required]],
    sessionId          : ['', [Validators.required]],
    semStartDate          : ['', [Validators.required]],
    semEndDate          : ['', [Validators.required]]

 
  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
}
updateForm(data){
  this.startDate = new Date(data.semStartDate) ;
  this.endDate= new Date(data.semEndDate);
   this.registerForm = this.formBuilder.group({
    semesterName           : [data.semesterName, Validators.required],
    courseBranchId          : [data.courseBranchId, [Validators.required]],
    sessionId          : [data.sessionId, [Validators.required]],
    semStartDate          : [data.semStartDate, [Validators.required]],
    semEndDate          : [data.semEndDate, [Validators.required]]
 
  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
}
depList:any;
 depListget(){
  var data ={courseId:this.WebService.getCoursetId}
  this.WebService.getlistBran(data).subscribe(res=>{
    this.depsessionget()

 this.depList = res.data;
   })
 }
 minDate = new Date();
 events: string[] = [];
minDate2 = new Date();
startDate:any;
endDate:any;
 addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  this.events.push(`${type}: ${event.value}`);
  console.log(JSON.stringify(this.events))
  this.minDate2 = event.value;
  console.log(event.value)
  this.startDate = event.value;
   
 }
 addEvent2(type: string, event: MatDatepickerInputEvent<Date>) {
    
  this.endDate = event.value
 }
 sessionList:any;
 depsessionget(){
  this.sessionList =[];
  var data ={courseId:this.WebService.getCoursetId}
   
  this.WebService.getSession().subscribe(res=>{
     
     for(var i =0 ;i<res.data.length;i++){
      if(this.WebService.getCoursetId == res.data[i].courseId) {
  this.sessionList.push(res.data[i])
   
      }
       }
  })
      }
           
      
  ngOnInit() {
    this.depListget();
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
