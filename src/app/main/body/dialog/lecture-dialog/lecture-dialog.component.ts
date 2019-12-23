import { Component, OnInit,Inject,VERSION } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
 import {StudentService} from '../../student/studentWebservice';
 import {LectureWebService} from '../../academics/lecture/lecture.webservice';

@Component({
  selector: 'app-lecture-dialog',
  templateUrl: './lecture-dialog.component.html',
  styleUrls: ['./lecture-dialog.component.scss']
})
export class LectureDialogComponent implements OnInit {
  registerForm: FormGroup;
  roomList: any;
  teacherLists: any;
  subjectLists: any; 
  semList : any;
 dayLists: any;
 branchList: any;
 courseList: any;
 private config = { hour: 7, minute: 15, meriden: 'PM', format: 12 };
 departmentList:any;

  constructor( public dialogRef: MatDialogRef<LectureDialogComponent>,
    private webService:StudentService,  private formBuilder: FormBuilder,
    private LectureWeb:LectureWebService) { }
  courseSelect(){
    var data = {
      departmentId:this.registerForm.value.departmentId
    }
     this.webService.getlistCou(data).subscribe(res=>{
this.courseList = res.data;
      });
  }
  
  branchSelect(){
   var data = {
     courseId:this.registerForm.value.courseId
   } 
    this.webService.getlistBran(data).subscribe(res=>{
 this.branchList = res.data;
    })
 }
 
 semSelect(){
   var data = {
     courseBranchId:this.registerForm.value.courseBranchId
   }
       this.webService.getlistSem(data).subscribe(res=>{
this.semList = res.data;
     }) 
 }
roomLists(){
  this.LectureWeb.getlistRoom().subscribe(res=>{
     this.roomList = res.data;
  })
}
teacherList(){
  this.LectureWeb.getlistTeacher().subscribe(res=>{
    this.teacherLists = res.data;
  })
}
subjectList(){

  this.LectureWeb.getlistSubject().subscribe(res=>{
    this.subjectLists = res.data;
   })
}
dayList(){
  this.LectureWeb.getDayList().subscribe(res=>{
  this.dayLists = res.data;
  })
}
mytime: Date = new Date();

 createForm(){
  this.registerForm = this.formBuilder.group({
     classId          : ['0', [Validators.required]],
     departmentId :[''], 
    courseId :[''],
    semesterId:[''],
    courseBranchId:[''],
    lectureTime:[new Date()],
    subjectId:[''],
    teacherId:[''],
    roomId:[''],
    dayId:[''],
     });

 this.registerForm.valueChanges.subscribe(() => {
 });
}

deptList(){
  this.webService.getlistDep().subscribe(res=>{
this.departmentList = res.data;
   })
}

  ngOnInit() {
    this.deptList();
    this.createForm();
    this.subjectList();
    this.teacherList();
    this.dayList();
    this.roomLists();

  }
  AddLecture(){
   this.LectureWeb.lectureSave(this.registerForm.value).subscribe(res=>{
    alert(JSON.stringify(res))
    this.dialogRef.close();

  })
  }
  onNoClick(){
    this.dialogRef.close();
  }
}
