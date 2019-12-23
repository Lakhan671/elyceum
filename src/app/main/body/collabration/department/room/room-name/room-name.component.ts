import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
 import { fuseAnimations } from '../../../../../../core/animations';
import { FuseConfigService } from '../../../../../../core/services/config.service';
   import {ColabrationService} from '../../../collabarationweservice'
  import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
 import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
 import { FuseUtils } from '../../../../../../core/fuseUtils';
  import {RoomDialogComponent} from '../../../../../body/dialog/room-dialog/room-dialog.component';
  import {
  MatTableDataSource
} from '@angular/material';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-room-name',
  templateUrl: './room-name.component.html',
  styleUrls: ['./room-name.component.scss'],
  animations   : fuseAnimations

})
export class RoomNameComponent implements OnInit {
   displayedColumns = ['Sno', 'roomName', 'roomType', 'option'];
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
     this.rou.navigate(['collabration/department/section'])
  }
addUser(){
  let dialogRef = this.dialog.open(RoomDialogComponent, {
    height: '350px',
    width: '450px',
    data: {  type:'create',RoomTypeList:this.RoomTypeList  }
 });
dialogRef.afterClosed().subscribe(result => {
this.getcourseList();
});
}
update(data){
  let dialogRef = this.dialog.open(RoomDialogComponent, {
    height: '350px',
    width: '450px',
    data: {  type:'update',courseName: data.courseName,courseDuration:data.courseDuration,RoomTypeList:this.RoomTypeList,departmentId:data.departmentId,courseId:data.courseId}
 });
dialogRef.afterClosed().subscribe(result => {
this.getcourseList();
});

}
RoomTypeList:any;
depList(){
  this.web.getlistRoomTypeList().subscribe(res=>{
    this.RoomTypeList = res.data;
    // for( var i = 0 ;i< this.RoomTypeList.length ; i++) {
    //   if( this.web.getDepartmentId  == false) {

    //     this.selectedProject = {
    //       roomType:this.RoomTypeList[0].roomType,
    //       roomtypeId:this.RoomTypeList[0].roomtypeId

    //     }

    //     this.web.setDepartment(this.RoomTypeList[0].roomtypeId);
       
    //   }else{
    //     if( this.RoomTypeList[i].departmentId == this.web.getDepartmentId) {
    //       this.selectedProject = {
    //         roomType:this.RoomTypeList[i].roomType,
    //         roomtypeId:this.RoomTypeList[i].roomtypeId

    //       }
    //     }
    //   }
    // }
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
   this.web.getlistRoomList().subscribe(res=>{
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
