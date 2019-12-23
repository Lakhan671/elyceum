import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {StudentService} from '../../student/studentWebservice';
import {feeWebService} from '../../academics/fee/feeWebservice';

@Component({
  selector: 'app-fee-dialog',
  templateUrl: './fee-dialog.component.html',
  styleUrls: ['./fee-dialog.component.scss']
})
export class FeeDialogComponent implements OnInit {


  registerForm: FormGroup;
  registerFormErrors: any;
  onNoClick(){
    this.dialogRef.close();
  }
  createUser(){
 
  }

  friendLisst:any;

  constructor( private formBuilder: FormBuilder, public dialogRef: MatDialogRef<FeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , private StudentService:StudentService ,private feeWebService:feeWebService ) { 
      if(data.type == 'create'){
        this.createForm();
      }
   }
   
   Addmember(){ 
   }
   getFriendList (){ 
   }
createForm(){
  this.registerForm = this.formBuilder.group({
    actualFee           : ['', Validators.required],
   
    feeDiscount           : ['', Validators.max(100)],
    hostelFee           : ['', Validators.required],
    totalfee           : ['', Validators.required],
    submitFee           : ['', Validators.required],
    remianingFee           : ['', Validators.required],
    instalmentType           : ['', Validators.required],
    studentId   : ['', Validators.required],
    submittedById   : ['', Validators.required],
    isFullAmmount   : ['', Validators.required],
    departmentId  : ['', Validators.required],
    courseId  : ['', Validators.required],
    courseBranchId  : ['', Validators.required],
    semesterId  : ['', Validators.required],
    sessionId  : ['', Validators.required],


  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
}  
totaldeeselect(){
  
  this.registerForm.controls['totalfee'].setValue((this.registerForm.value.hostelFee + this.registerForm.value.actualFee ) * (100- this.registerForm.value.feeDiscount )/100 )

  
}
remainigFee(){
  this.registerForm.controls['remianingFee'].setValue(this.registerForm.value.totalfee - this.registerForm.value.submitFee)
  

}
Addfee(){
  this.registerForm.value.instalmentType = 1;
  
  this.feeWebService.Savefee(this.registerForm.value).subscribe(res=>{
this.feeWebService.alertDialog(res.message,'Academics/fee')  })
}
courseList:any
courseSelect(){
  
  var data = {
    departmentId:this.registerForm.value.departmentId
  }
   this.StudentService.getlistCou(data).subscribe(res=>{
    
this.courseList = res.data;

   })
}
branchList:any;
branchSelect(){
 var data = {
   courseId:this.registerForm.value.courseId
 }
 
  this.StudentService.getlistBran(data).subscribe(res=>{
this.branchList = res.data;
  })
}
semList:any;
semSelect(){
 var data = {
   courseBranchId:this.registerForm.value.courseBranchId
 }
 
  this.StudentService.getlistSem(data).subscribe(res=>{
this.semList = res.data;
  })
}
studentLists:any;
studentList(){
  if(this.registerForm.value.sessionId && this.registerForm.value.semesterId){
   var data ={
    sessionId:this.registerForm.value.sessionId,
    semesterId:this.registerForm.value.semesterId
   }
    this.StudentService.getlistStudent(data).subscribe(res=>{
      console.log(JSON.stringify(res.data));
      this.studentLists = res.data;
          })
  }
}
depList:any;
depListes(){
  this.StudentService.getlistDep().subscribe(res=>{
    this.depList = res.data;
    this.sessionListes();
  })
}
sessList:any; 
sessionListes(){
  this.StudentService.getSession().subscribe(res=>{
    alert(JSON.stringify(res))
     this.sessList = res.data;
  })
}
  ngOnInit() { 
    this.depListes();
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
