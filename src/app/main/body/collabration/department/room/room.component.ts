import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
 import { fuseAnimations } from '../../../../../core/animations';
import { FuseConfigService } from '../../../../../core/services/config.service';
   import {ColabrationService} from '../../collabarationweservice'
  import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
 import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
 import { FuseUtils } from '../../../../../core/fuseUtils';
  import {RoomTypeDialogComponent} from '../../../../body/dialog/room-type-dialog/room-type-dialog.component';
  import {
  MatTableDataSource
} from '@angular/material';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  animations   : fuseAnimations

})
export class RoomComponent implements OnInit {

  displayedColumns = ['Sno', 'roomType', 'option'];
  @ViewChild(MatSort,   {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,   {static: true}) paginator: MatPaginator;
 @ViewChild('filter',   {static: true}) filter: ElementRef;
  productsService: any;
  ELEMENT_DATA: any;
  dataSource = new MatTableDataSource < Element > (ELEMENT_DATA);

  constructor(private web: ColabrationService,
     private fuseConfig: FuseConfigService,
    public dialog: MatDialog,
    public router:Router
  ) { 
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });

  }
  CourseSelect(data){
     this.router.navigate(['collabration/department/room/roomName'])
   }
addUser(){
  let dialogRef = this.dialog.open(RoomTypeDialogComponent, {
    height: '250px',
    width: '250px',
    data: {  type:'create'  }
 });
dialogRef.afterClosed().subscribe(result => {
this.getdepList();
});
}
update(data){
    let dialogRef = this.dialog.open(RoomTypeDialogComponent, {
    height: '250px',
    width: '250px',
    data: {  type:'update',roomType: data.roomType,roomTypeId:data.roomtypeId}
 });
dialogRef.afterClosed().subscribe(result => {
this.getdepList();
});

}
  ngOnInit() {
    this.getdepList();
  }
getdepList(){
  this.web.getlistRoomTypeList().subscribe(res=>{
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
