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
import { FuseUtils } from '../../../../core/fuseUtils';
import { FuseConfigService } from '../../../../core/services/config.service';
import {GroupDialogComponent} from '../../../body/dialog/group-dialog/group-dialog.component';
import {WebService} from '../../../../core/services/webservice'
import {
 MatTableDataSource
} from '@angular/material';
import { fuseAnimations } from '../../../../core/animations';
import {SelectionModel} from '@angular/cdk/collections'; 
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [ ];
@Component({
  selector: 'app-group-member',
  templateUrl: './group-member.component.html',
  styleUrls: ['./group-member.component.scss'],
  animations   : fuseAnimations
})
export class GroupMemberComponent implements OnInit {
GroupDetail:any;
displayedColumns = ['select','Sno', 'name'];
@ViewChild(MatSort,   {static: true}) sort: MatSort;
@ViewChild(MatPaginator,   {static: true}) paginator: MatPaginator;
@ViewChild('filter',   {static: true}) filter: ElementRef;
productsService: any;
ELEMENT_DATA: any;
dataSource = new MatTableDataSource < PeriodicElement > (ELEMENT_DATA);
  constructor(   private fuseConfig: FuseConfigService,private Web: WebService,
    public dialog: MatDialog ,

  ) { 
this.GroupDetail = this.Web.getgroupDetail;
console.log(JSON.stringify(this.GroupDetail))
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });
 
  }

  selection = new SelectionModel<PeriodicElement>(true, []);

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

  addUser(){
    let dialogRef = this.dialog.open(GroupDialogComponent, {
      height: '300px',
      width: '450px',
      data: {  type:'create', option:'member'  }
   });
  dialogRef.afterClosed().subscribe(result => {
  this.getGroupMembers();
  });
 
  }
  getGroupMembers(){
    var data = {
      groupId:this.GroupDetail.groupId
    }
    this.Web.groupmemberGet(data).subscribe(res =>{
       
      this.dataSource = new MatTableDataSource < PeriodicElement > (res.data);

    })
  }
  ngOnInit() {
    this.getGroupMembers();
  }

} 