import { Component, OnInit,Inject,VERSION } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
 import {StudentService} from '../../student/studentWebservice';
@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss']
})
export class StudentDialogComponent implements OnInit {
  registerForm: FormGroup;
  registerFormErrors: any;
  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';
  breakpoint: number;
   onNoClick(){
    this.dialogRef.close();
  }
   
  updateUser(){ 
     }
     courseList:any
     courseSelect(){
       var data = {
         departmentId:this.registerForm.value.departmentId
       }
        this.webService.getlistCou(data).subscribe(res=>{
this.courseList = res.data;
        })
     }
     branchList:any;
     branchSelect(){
      var data = {
        courseId:this.registerForm.value.courseId
      }
      
       this.webService.getlistBran(data).subscribe(res=>{
this.branchList = res.data;
       })
    }
    semList:any;
    semSelect(){
      var data = {
        courseBranchId:this.registerForm.value.newCourseBranchId
      }
      
       this.webService.getlistSem(data).subscribe(res=>{
this.semList = res.data;
       })
    }
    addStudent(){
 this.webService.saveStudent(this.registerForm.value).subscribe(res=>{
this.webService.alertDialog(res.message,'student');
this.dialogRef.close();
});
    }
  constructor(private webService:StudentService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  ) {
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
    fName           : ['', Validators.required],
    mName          : ['', [Validators.required]],
    lName           : ['', Validators.required],
    email          : ['', [Validators.required]],
    mobileNo           : ['', Validators.required],
    classId          : ['0', [Validators.required]],
    isHostler           : ['0',  ],
    feeRecordId          : ['0', ],
    sessionId :[''],
    departmentId :[''],
    courseId :[''],
    semesterId:[''],
    addmissionDate:[''],
    currentYear:[''],
    usertype:['1'],
    password:[''],
    oldCourceBranchId:['0'],
    newCourseBranchId:[''],
    enrollmentNo:[''],
    rollNo:[''],
    check:[] 
   });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
}
updateForm(data){ 
}
ngOnInit() {
  this.breakpoint = (window.innerWidth <= 600) ? 1 : 3;
}

onResize(event) {
  this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 3;
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
