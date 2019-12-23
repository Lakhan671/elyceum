import { fuseAnimations } from '../../../../core/animations';
import { Component, ElementRef, OnInit, ViewChild,VERSION } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FuseUtils } from '../../../../core/fuseUtils';
import { FuseConfigService } from '../../../../core/services/config.service';
 import {StudentService} from '../studentWebservice';
 import {PermotionDialogComponent} from '../../dialog/permotion-dialog/permotion-dialog.component'
 import {
  MatTableDataSource
} from '@angular/material';

@Component({
  selector: 'app-student-permotion',
  templateUrl: './student-permotion.component.html',
  styleUrls: ['./student-permotion.component.scss'],
  animations   : fuseAnimations

})
export class StudentPermotionComponent implements OnInit {
  displayedColumns = ['Sno', 'permotionType','option'];
  @ViewChild(MatSort,   {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,   {static: true}) paginator: MatPaginator;
 @ViewChild('filter',   {static: true}) filter: ElementRef;
 dataSource = new MatTableDataSource < Element > (ELEMENT_DATA);
 addUser(){
  let dialogRef = this.dialog.open(PermotionDialogComponent, {
    height: '250px',
    width: '350px',
    data: {  type:'create' }
 });
dialogRef.afterClosed().subscribe(result => {
  this.permotionTypeList();
 });

}
  constructor(private fuseConfig:FuseConfigService,
    public dialog: MatDialog,
    private webService:StudentService) {     this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });
}
permotionTypeList(){
  this.webService.getpermotiontype().subscribe(res=>{
     this.dataSource = new MatTableDataSource < Element > (res.data);
  })
}
update(data){
  let dialogRef = this.dialog.open(PermotionDialogComponent, {
    height: '250px',
    width: '350px',
    data: {  type:'update',data:data }
 });
dialogRef.afterClosed().subscribe(result => {
  this.permotionTypeList();
 });
}
  ngOnInit() {
    this.permotionTypeList();
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
  