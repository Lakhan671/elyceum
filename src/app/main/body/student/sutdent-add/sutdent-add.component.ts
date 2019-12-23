import { Component, OnInit,Inject,VERSION } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
  import {StudentService} from '../../student/studentWebservice';
import { Router } from '@angular/router';
  
@Component({
  selector: 'app-sutdent-add',
  templateUrl: './sutdent-add.component.html',
  styleUrls: ['./sutdent-add.component.scss']
})
export class SutdentAddComponent implements OnInit {
  registerForm: FormGroup;
  firstFormGroup:FormGroup;
  secondFormGroup:FormGroup;
  registerFormErrors: any;
  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';
  breakpoint: number;
   onNoClick(){
   }
   
  updateUser(){ 
     }
     courseList:any
     courseSelect(){
       var data = {
         departmentId:this.secondFormGroup.value.departmentId
       }
        this.webService.getlistCou(data).subscribe(res=>{
        this.courseList = res.data;
        })
     }
     branchList:any;
     branchSelect(){
      var data = {
        courseId:this.secondFormGroup.value.courseId
      }
      
       this.webService.getlistBran(data).subscribe(res=>{
this.branchList = res.data;
       })
    }
    semList:any;
    semSelect(){
      var data = {
        courseBranchId:this.secondFormGroup.value.newCourseBranchId
      }
      
       this.webService.getlistSem(data).subscribe(res=>{
this.semList = res.data;
       })
    }
    addStudent(){
      let datajson = {         ...this.firstFormGroup.value,...this.secondFormGroup.value}
      // { ...this.firstFormGroup.value, location: response }
      // let datajson = this.firstFormGroup.value.concat(this.secondFormGroup.value)   
        console.log(JSON.stringify(datajson))
 this.webService.saveStudent(datajson).subscribe(res=>{
this.webService.alertDialog(res.message,'student');
 });
    }
    departmentList:any;
    sessList:any;
  constructor(private webService:StudentService, private formBuilder: FormBuilder ,private Router:Router ) {
    let data = {type:"create"};
    if(this.webService.getDepartList){
      this.departmentList = this.webService.getDepartList;
      this.sessList =this.webService.getsessList;
      alert(JSON.stringify(this.sessList))
    }else{
      this.Router.navigate(['/student'])
    }

    this.createForm();

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
  this.firstFormGroup = this.formBuilder.group({
    fName           : [''],
    mName          : ['', ],
    lName           : [''],
    email          : ['', ],
    mobileNo           : [''],
    password:[''],

  })
  this.secondFormGroup = this.formBuilder.group({
    departmentId :[''],
    courseId :[''],
    semesterId:[''],
    addmissionDate:[''],
    currentYear:[''],
    newCourseBranchId:[''],
    enrollmentNo:[''],
    rollNo:[''],
    classId          : ['0', ],
    feeRecordId          : ['0', ],
    sessionId :[''],
    oldCourceBranchId:['0'],
    usertype:['1'],


  })
  this.registerForm = this.formBuilder.group({
    fName           : [''],
    mName          : ['', ],
    lName           : [''],
    email          : ['', ],
    mobileNo           : [''],
    classId          : ['0', ],
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
