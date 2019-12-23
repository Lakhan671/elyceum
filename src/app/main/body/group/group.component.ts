import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatPaginator, MatSort,MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { FuseUtils } from '../../../core/fuseUtils';
import { FuseConfigService } from '../../../core/services/config.service';
import {GroupDialogComponent} from '../../body/dialog/group-dialog/group-dialog.component';
import {WebService} from '../../../core/services/webservice'
import {
 MatTableDataSource
} from '@angular/material';
import { fuseAnimations } from '../../../core/animations';
import {
  Router
} from '@angular/router';
@Component({
 selector: 'group',
 templateUrl: './group.component.html',
 styleUrls: ['./group.component.scss'],
 animations   : fuseAnimations

})
export class GroupComponent implements OnInit {

  displayedColumns = ['Sno', 'title','active'];
  @ViewChild(MatSort,   {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,   {static: true}) paginator: MatPaginator;
 @ViewChild('filter',   {static: true}) filter: ElementRef;
  productsService: any;
  ELEMENT_DATA: any;
  dataSource = new MatTableDataSource < Element > (ELEMENT_DATA);
 constructor(
   private fuseConfig: FuseConfigService,
   public dialog: MatDialog ,
   private WebService : WebService,
   private route:Router

  )  {
   this.fuseConfig.setSettings({
     layout: {
         navigation: 'top',
     toolbar   : 'above',
        footer    : 'none'
     }
 });

 }
 editgrp(data){
  let dialogRef = this.dialog.open(GroupDialogComponent, {
    height: '300px',
    width: '450px',
    data: {  type:'update',data:data  }
 });
dialogRef.afterClosed().subscribe(result => {
this.getUsers();
});


 }
 groupMember(data){
  this.WebService.setgrouId(data);
   this.route.navigate(['group/member']);
   
 }
 getUsers(){
this.WebService.groupget().subscribe(res=>{
   this.dataSource = new MatTableDataSource < Element > (res.data);
})
 }
 addUser(){
   let dialogRef = this.dialog.open(GroupDialogComponent, {
     height: '300px',
     width: '450px',
     data: {  type:'create'  }
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
    this.getUsers();}
}
export interface Element {
}

const ELEMENT_DATA: Element[] = [];
