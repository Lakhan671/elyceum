import { Component, OnInit, ɵConsole } from '@angular/core';
import { FuseConfigService } from '../../../../core/services/config.service';
import { fuseAnimations } from '../../../../core/animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MatDialog  } from '@angular/material';
import {UnitDialogComponent} from '../../dialog/unit-dialog/unit-dialog.component'
import {SubjectService} from '../SubjectWebservice'
import {
  Router
} from '@angular/router';
 
@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss'],
  animations   : fuseAnimations

})
export class CreateSubjectComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thridFormGroup:FormGroup;
  forthormGroup:FormGroup;

  registerForm: FormGroup;
  registerFormErrors: any;
  tiles: any;
  unitList:any;
  showClassTeacher:boolean;
  teacherList:any;
  categoryList:any;
  picker:any;
  picker2:any;
  createForm(){
    this.showClassTeacher = false;

    this.firstFormGroup = this.formBuilder.group({
      title: ['' ],
      startDate           : ['' ],
      endDate           : ['' ],
      hourlyWorking           : [false],
      noOfHour:[''],
      description           : [''],


    });
    
    this.secondFormGroup = this.formBuilder.group({
      categoryId: ['' ],
      priority:['']
    });
    this.thridFormGroup = this.formBuilder.group({
      IncludeUnit:[false]
    })
    this.forthormGroup = this.formBuilder.group({
      classTeacher           : [''],
      assign_to           : [''],
      private           : [''] 
    })
    this.registerForm = this.formBuilder.group({
      startDate           : [''],
      endDate           : [''],
      unit           : [''],
      unit_percent           : [''],
      hourlyWorking           : [''],
      estimateTime           : [''],
      private           : [''],
      title           : [''],
      classTeacher           : [''],
      assign_to           : [''],
      categoryId           : [''],
      completed           : [''],
      completedTimeMinute           : [''],
      description           : [''],
      estimatedTimeMinute           : [''],
      priority           : [''],
      status           : [''],
      subjectType           : [''],
      IncludeUnit  : [''],
       });
   this.registerForm.valueChanges.subscribe(() => {
      this.onRegisterFormValuesChanged();
  });
  }
  category(){
    let dialogRef = this.dialog.open(UnitDialogComponent, {
      width: '350px',
     data: {  type:'category',action:'create'   }
  });
 dialogRef.afterClosed().subscribe(result => {
this.categoryGet();
  });
 
 
  }
  unitPercentage:any;
  total:any;
  addUnit(){
 
    let dialogRef = this.dialog.open(UnitDialogComponent, {
      width: '350px',
     data: {  type:'unit',action:'nothourly',option:'add',data: this.unitList }
  });
 dialogRef.afterClosed().subscribe(result => {
  
   this.total = result.total;
    this.unitList.push(result)
    
  });
 

  }
  editUnit(selected,index){
     let dialogRef = this.dialog.open(UnitDialogComponent, {
      width: '350px',
     data: {  type:'unit',action:'nothourly',option:'edit',data: this.unitList,selected:selected,index:index}
  });
 dialogRef.afterClosed().subscribe(result => {
    this.total = result.totalvalue
   this.unitList =     result.data
  });
 

  }
  deleterow(index){
    this.total = 0;

     this.unitList.splice(index, 1);
     
    for(var i =0 ;i<this.unitList.length;i++){
      this.total =  this.total + JSON.parse(this.unitList[i].percentage);
    }

  }
  categoryGet(){
      this.webservice.getcategorylistSem().subscribe(res=>{
         this.categoryList = res.data;
      })
  }
  teacherGet(){
    this.webservice.getteacherlistSem().subscribe(res=>{
      console.log(JSON.stringify(res));
      this.teacherList = res.data;
    })
}
testss:any;
test(){
 
this.testss =[]
let s= this.forthormGroup.value.assign_to.toString().split(",");
   for (var ext in s){
    for(var i =0;i<this.teacherList.length ;i++){
     if(this.teacherList[i].teacherId == s[ext]){
      this.testss.push(this.teacherList[i])
     }
   }
   }
     if(this.testss.length>0){
     this.showClassTeacher = true;
   }else{
    this.showClassTeacher = false;

   }
   
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

   constructor(private webservice:SubjectService,private dialog:MatDialog,private fuseConfig: FuseConfigService, private Route: Router, private formBuilder: FormBuilder) {
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });
  this.unitList =[];

  this.tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  this.registerFormErrors = {
    name           : {},
    email          : {},
    cemail          : {},
    mobileNo: {},
    password       : {},
    passwordConfirm: {}
};

  }

  ngOnInit() {
    this.createForm();
    this.categoryGet();
    this.teacherGet();

  }
  unit:any;
  unitper:any;

  createSubject(){
    let obj1 = { a :  "aValue" , b :  "bValue"  };
let obj2 = Object.assign(this.firstFormGroup.value, this.secondFormGroup.value);
let obj3 = Object.assign(obj2, this.thridFormGroup.value);
let obj4 = Object.assign(obj3, this.forthormGroup.value);

obj4.status = "true"

   if(obj4.hourlyWorking == false){
    obj4.hourlyWorking = "No";
    obj4.subjectType ="D";
    obj4.estimateTime = "0"
    obj4.completed = "0"

    obj4.completedTimeMinute = "0"
    obj4.estimatedTimeMinute = "0"


  }else{
    obj4.hourlyWorking = "Yes";
    obj4.subjectType ="H";

 }
 if(obj4.private == false){
  obj4.private = "No"
 
 }else{
  obj4.private = "Yes"
  this.unit = [];
  this.unitper=[];
 }

 this.unit = [];
 this.unitper = [];
if(this.unitList.length > 0){


 for(var i =0 ;i<this.unitList.length;i++){
 this.unit.push(this.unitList[i].name);
 this.unitper.push(this.unitList[i].percentage);


}
}
 obj4.unit_percent = this.unitper.toString();
 obj4.unit = this.unit.toString();
 obj4.assign_to = this.registerForm.value.assign_to.toString();
 console.log("Data Send"+ JSON.stringify(obj4))
 alert(this.picker)
  this.webservice.SubjectSave(obj4).subscribe(res=>{
   console.log(res)
 this.webservice.alertDialog('Successfully created','subject')
   
  })
  }
 
}
