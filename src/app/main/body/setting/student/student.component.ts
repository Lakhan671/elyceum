import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { FuseUtils } from '../../../../core/fuseUtils';
import { FuseConfigService } from '../../../../core/services/config.service';
import {AdduserComponent} from '../../../body/dialog/adduser/adduser.component';
import {WebService} from '../../../../core/services/webservice';
import {StudentService} from './student.service';
import {
  MatTableDataSource
} from '@angular/material';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

   displayedColumns = ['Sno', 'userName', 'email', 'userType'];
   @ViewChild(MatSort,   {static: true}) sort: MatSort;
   @ViewChild(MatPaginator,   {static: true}) paginator: MatPaginator;
  @ViewChild('filter',   {static: true}) filter: ElementRef;
   productsService: any;
   ELEMENT_DATA: any;
   dataSource = new MatTableDataSource < Element > (ELEMENT_DATA);
  constructor(
    private StudentService: StudentService,
    private fuseConfig: FuseConfigService,
    public dialog: MatDialog ,
    private Web: WebService

   )  {
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });

  }
  getUsers() {
    this.Web.getUser().subscribe(res => {
      this.productsService =  res.data;
      this.productsService.forEach(element => {
      element.userType = 'Student';
     });
      this.dataSource = new MatTableDataSource < Element > (this.productsService);
    });
  }
  addUser() {
    const dialogRef = this.dialog.open(AdduserComponent, {
      height: '300px',
      width: '450px',
      data: {  type: 'create'  }
   });
    dialogRef.afterClosed().subscribe(result => {
  this.getUsers();
  });

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
     this.getUsers(); }
}
export interface Element {
}

const ELEMENT_DATA: Element[] = [];
