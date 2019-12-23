 import {departmentService} from './department.service';
 import { fuseAnimations } from '../../../../core/animations';
 import {ColabrationService} from '../collabarationweservice';
 import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
 import { DataSource } from '@angular/cdk/collections';
 import { Observable } from 'rxjs/Observable';
 import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
 import { BehaviorSubject } from 'rxjs/BehaviorSubject';
 import { FuseUtils } from '../../../../core/fuseUtils';
 import { FuseConfigService } from '../../../../core/services/config.service';
 import {DepartmentDialogComponent} from '../../../body/dialog/department/department.component';
 import {
  MatTableDataSource
} from '@angular/material';
 import {
  Router
} from '@angular/router';

 @Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  animations   : fuseAnimations

})
export class DepartmentComponent implements OnInit {

  displayedColumns = ['Sno', 'departmentName', 'description', 'option'];
  @ViewChild(MatSort,   {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,   {static: true}) paginator: MatPaginator;
 @ViewChild('filter',   {static: true}) filter: ElementRef;
  productsService: any;
  ELEMENT_DATA: any;
  dataSource = new MatTableDataSource < Element > (ELEMENT_DATA);

  constructor(private web: ColabrationService,
              private departmentService: departmentService,
              private fuseConfig: FuseConfigService,
              public dialog: MatDialog,
              public router: Router
  ) {
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });

  }
  CourseSelect(data) {
     this.web.setDepartment(data.departmentId);
     this.router.navigate(['collabration/department/course']);
  }
addUser() {
  const dialogRef = this.dialog.open(DepartmentDialogComponent, {
    height: '350px',
    width: '450px',
    data: {  type: 'create'  }
 });
  dialogRef.afterClosed().subscribe(result => {
this.getdepList();
});
}
update(data) {
   const dialogRef = this.dialog.open(DepartmentDialogComponent, {
    height: '350px',
    width: '450px',
    data: {  type: 'update', departmentName: data.departmentName, description: data.description, departmentId: data.departmentId}
 });
   dialogRef.afterClosed().subscribe(result => {
this.getdepList();
});

}
  ngOnInit() {
    this.getdepList();
  }
getdepList() {
  this.web.getlistDep().subscribe(res => {

     this.dataSource = new MatTableDataSource < Element > (res.data);

  });
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
