import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import  {courseService} from './course.service';
import { fuseAnimations } from '../../../../../core/animations';
import { FuseConfigService } from '../../../../../core/services/config.service';
   import {ColabrationService} from '../../collabarationweservice'
  import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
 import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { FuseUtils } from '../../../../../core/fuseUtils';
  import {CourseDialogComponent} from '../../../../body/dialog/course/course.component';
  import {
  MatTableDataSource
} from '@angular/material';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  animations   : fuseAnimations
  
})
export class CourseComponent implements OnInit {
  displayedColumns1 = ['Sno', 'Brach', 'Brach1', 'option'];
  displayedColumns = ['Sno', 'courseName', 'courseDuration', 'option'];
  @ViewChild(MatSort,   {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,   {static: true}) paginator: MatPaginator;
 @ViewChild('filter',   {static: true}) filter: ElementRef;
  productsService: any;
  ELEMENT_DATA: any;
   dataSource = new MatTableDataSource < Element > (ELEMENT_DATA);
  projects:any;
  selectedProject:any;
  constructor(private web:ColabrationService,
     private fuseConfig:FuseConfigService,
    public dialog: MatDialog,
    private rou: Router
  ) { 
   
     this.selectedProject={
      departmentName:'Select Department'
    }
     this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });

  }
 
  BranchSelect(data){
    this.web.setCourse(data.courseId)
    this.rou.navigate(['collabration/department/branch'])
  }
addUser(){
  let dialogRef = this.dialog.open(CourseDialogComponent, {
    height: '350px',
    width: '450px',
    data: {  type:'create',departMenttList:this.DepaList  }
 });
dialogRef.afterClosed().subscribe(result => {
this.getcourseList();
});
}
update(data){
  let dialogRef = this.dialog.open(CourseDialogComponent, {
    height: '350px',
    width: '450px',
    data: {  type:'update',courseName: data.courseName,courseDuration:data.courseDuration,departMenttList:this.DepaList,departmentId:data.departmentId,courseId:data.courseId}
 });
dialogRef.afterClosed().subscribe(result => {
this.getcourseList();
});

}
DepaList:any;
depList(){
  this.web.getlistDep().subscribe(res=>{
    this.DepaList = res.data;
    for( var i = 0 ;i< this.DepaList.length ; i++) {
      if( this.web.getDepartmentId  == false) {

        this.selectedProject = {
          departmentName:this.DepaList[0].departmentName,
          departmentId:this.DepaList[0].departmentId

        }

        this.web.setDepartment(this.DepaList[0].departmentId);
       
      }else{
        if( this.DepaList[i].departmentId == this.web.getDepartmentId) {
          this.selectedProject = {
            departmentName:this.DepaList[i].departmentName,
            departmentId:this.DepaList[i].departmentId

          }
        }
      }
    }
    this.getcourseList();

 })

}
selectedCourse(){
  
  this.web.setDepartment(this.selectedProject.departmentId);
  this.getcourseList();
}
  ngOnInit() {
    this.depList();
  }
  getcourseList(){
    var data ={departmentId:this.web.getDepartmentId}
  this.web.getlistCou(data).subscribe(res=>{
     this.dataSource = new MatTableDataSource < Element > (res.data);

  })
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
