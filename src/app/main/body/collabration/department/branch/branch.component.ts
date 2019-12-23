import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
 import { fuseAnimations } from '../../../../../core/animations';
import { FuseConfigService } from '../../../../../core/services/config.service';
   import {ColabrationService} from '../../collabarationweservice'
  import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
 import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
 import { FuseUtils } from '../../../../../core/fuseUtils';
  import {BranchDialogComponent} from '../../../../body/dialog/branch-dialog/branch-dialog.component';
  import {
  MatTableDataSource
} from '@angular/material';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss'],
  animations   : fuseAnimations
  
})
export class BranchComponent implements OnInit {
   displayedColumns = ['Sno', 'branchName', 'Course', 'option'];
  @ViewChild(MatSort,   {static: true}) sort: MatSort;
  @ViewChild(MatPaginator ,   {static: true}) paginator: MatPaginator;
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
     this.web.setBranch(data.courseBranchId)
    this.rou.navigate(['collabration/department/semister'])
  }
addUser(){
  let dialogRef = this.dialog.open(BranchDialogComponent, {
    height: '350px',
    width: '450px',
    data: {  type:'create',CorsetList:this.CouList  }
 });
dialogRef.afterClosed().subscribe(result => {
this.getbranchList();
});
}
update(data){
  let dialogRef = this.dialog.open(BranchDialogComponent, {
    height: '350px',
    width: '450px',
    data: {  type:'update',branchName: data.branchName,CorsetList:this.CouList,courseId:data.courseId,courseBranchId:data.courseBranchId}
 });
dialogRef.afterClosed().subscribe(result => {
this.getbranchList();
});

}
CouList:any;
CouLists(){
  var data ={departmentId:this.web.getDepartmentId}

  this.web.getlistCou(data).subscribe(res=>{
    this.CouList = res.data;
      for( var i = 0 ;i< this.CouList.length ; i++) {
      if( this.web.getCoursetId  == false) {

        this.selectedProject = {
         courseName:this.CouList[0].courseName,
         courseId:this.CouList[0].courseId

        }

        this.web.setCourse(this.CouList[0].courseId);
       
      }else{
        if( this.CouList[i].courseId == this.web.getCoursetId) {
          this.selectedProject = {
            courseName:this.CouList[i].courseName,
            courseId:this.CouList[i].courseId

          }
        }
      }
    }
    this.getbranchList();

 })

}
selectedCourse(){
  
  this.web.setCourse(this.selectedProject.courseId);
  this.getbranchList();
}
  ngOnInit() {
    this.CouLists();
  }
  getbranchList(){
    var data = {};
    if(this.web.getCoursetId == false){
      data ={courseId:this.CouList[0].getCoursetId}

    }else{
      data ={courseId:this.web.getCoursetId}


    }
  this.web.getlistBran(data).subscribe(res=>{

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
