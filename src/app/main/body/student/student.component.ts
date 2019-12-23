 import { fuseAnimations } from '../../../core/animations';
 import { Component, ElementRef, OnInit, ViewChild,VERSION } from '@angular/core';
 import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
 import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
 import { FuseUtils } from '../../../core/fuseUtils';
import { FuseConfigService } from '../../../core/services/config.service';
import {StudentDialogComponent} from '../dialog/student-dialog/student-dialog.component';
import {StudentService} from './studentWebservice';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
 
   import {
  MatTableDataSource
} from '@angular/material';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
  animations   : fuseAnimations

})
export class StudentComponent implements OnInit {
  displayedColumns = ['Sno', 'fName', 'email',  'mobileNo','enrollmentNo','rollNo','addmisinDate','currentYear','option'];
  @ViewChild(MatSort,   {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,   {static: true}) paginator: MatPaginator;
 @ViewChild('filter',   {static: true}) filter: ElementRef;
 dataSource = new MatTableDataSource < Element > (ELEMENT_DATA);
 ngVersion: string = VERSION.full;
 matVersion: string = '5.1.0';
 breakpoint: number;
 registerForm:FormGroup
  constructor(private fuseConfig:FuseConfigService,
    public dialog: MatDialog,
    private webService:StudentService,
    private formBuilder: FormBuilder,
    private Router:Router
  ) { 

    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });
  this.registerForm = this.formBuilder.group({
    departmentId           : ['', ],
    courseId           : ['', ],
    courseBranchId:[],
    semesterId:['',Validators.required],
    sessionId:['',Validators.required]

  });

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
  studentList(){
    if(this.registerForm.value.sessionId && this.registerForm.value.semesterId){
     var data ={
      sessionId:this.registerForm.value.sessionId,
      semesterId:this.registerForm.value.semesterId
     }
      this.webService.getlistStudent(data).subscribe(res=>{
        console.log(JSON.stringify(res.data));
      this.dataSource = new MatTableDataSource < Element > (res.data);

            })
    }
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
     courseBranchId:this.registerForm.value.courseBranchId
   }
   
    this.webService.getlistSem(data).subscribe(res=>{
this.semList = res.data;
    })
 }
  depList:any;
  addUser(){
    this.webService.setDepartList(this.depList);
    alert(this.sessList)
    this.webService.setsessList(this.sessList);
    alert(JSON.stringify(this.webService.getsessList))
    this.Router.navigate(['/student/Add']);
    
  //   let dialogRef = this.dialog.open(StudentDialogComponent, {
  //     height: '550px',
  //     width: '750px',
  //     data: {  type:'create',departmentList: this.depList ,sessList:this.sessList}
  //  });
  // dialogRef.afterClosed().subscribe(result => {
  //  });
  
  }
  depListes(){
    this.webService.getlistDep().subscribe(res=>{
      this.depList = res.data;
      this.sessionListes();
    })
  }
  sessList:any; 
  sessionListes(){
    this.webService.getSession().subscribe(res=>{
       this.sessList = res.data;
    })
  }
  ngOnInit() {
    this.depListes();
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 5;

  }
  
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 5;
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  }
  export interface Element {
  }
  
  const ELEMENT_DATA: Element[] = [];
  