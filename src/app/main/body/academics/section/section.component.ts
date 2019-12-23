import { fuseAnimations } from '../../../../core/animations';
import {SelectionModel} from '@angular/cdk/collections';

import { Component, ElementRef, OnInit, ViewChild,VERSION } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FuseUtils } from '../../../../core/fuseUtils';
import { FuseConfigService } from '../../../../core/services/config.service';
 import {SecionService} from './section.webservice';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatTableDataSource
} from '@angular/material';
import {SectionStudentDialogComponent} from '../../dialog/section-student-dialog/section-student-dialog.component'
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  animations   : fuseAnimations

})
export class SectionComponent implements OnInit {
  displayedColumns = ['Sno', 'fName' ,'enrollmentNo','rollNo' ];
  @ViewChild(MatSort,   {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,   {static: true}) paginator: MatPaginator;
 @ViewChild('filter',   {static: true}) filter: ElementRef;
 dataSource = new MatTableDataSource < Element > (ELEMENT_DATA);
 selection = new SelectionModel<Element>(true, []);

 ngVersion: string = VERSION.full;
 matVersion: string = '5.1.0';
 breakpoint: number;
 registerForm:FormGroup
  constructor(private fuseConfig:FuseConfigService,
    public dialog: MatDialog,
    private webService:SecionService,
    private formBuilder: FormBuilder
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
  
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
     
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
       
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
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
    console.log(JSON.stringify(this.selection))
     if(this.selection.selected.length > 0){
      
    }else{
      alert("No Student Selected");
      return false;
    }
    let dialogRef = this.dialog.open(SectionStudentDialogComponent, {
      width: '450px',
     data: {  type:'create' ,dataStudent: this.selection.selected,semesterid: this.registerForm.value.semesterId}
  });
 dialogRef.afterClosed().subscribe(result => {

   });
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