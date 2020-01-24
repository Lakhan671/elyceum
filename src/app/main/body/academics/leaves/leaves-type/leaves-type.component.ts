import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { FuseTranslationLoaderService } from '../../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../../core/animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ElementRef, ViewChild, VERSION } from '@angular/core';
import { FeeTypeDialogComponent } from '../../../dialog/fee-type-dialog/fee-type-dialog.component'
import {
  MatTableDataSource
} from '@angular/material';
import {
  Router
} from '@angular/router';
import { LeaveTypeDialogComponent } from 'src/app/main/body/dialog/leave-type-dialog/leave-type-dialog.component';
import { LeavesWebService } from 'src/app/main/body/academics/leaves/leaves.webservice';

@Component({
  selector: 'app-fee-type',
  templateUrl: './leaves-type.component.html',
  styleUrls: ['./leaves-type.component.scss'],
  animations: fuseAnimations

})
export class LeaveTypeComponent implements OnInit {
  displayedColumns = ['Sno', 'leaveType', 'action'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  constructor(private leaveService: LeavesWebService, private fuseConfig: FuseConfigService, private Route: Router, public dialog: MatDialog
  ) {
    this.fuseConfig.setSettings({
      layout: {
        navigation: 'top',
        toolbar: 'above',
        footer: 'none'
      }
    });
  }
  getLeaveType() {
    this.leaveService.getLeaveType().subscribe(res => {
      this.dataSource = new MatTableDataSource<Element>(res.data);
    })
  }
  addLeaveType(data) {
    let dialogRef = this.dialog.open(LeaveTypeDialogComponent, {
      height: '300px',
      width: '450px',
      data: { action: 'create',page: 'leaveType',header:' Add a leave type...' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getLeaveType();
    });
  }

  editLeaveType(leaveType) {
    leaveType.action = 'update';
    let dialogRef = this.dialog.open(LeaveTypeDialogComponent, {
      height: '300px',
      width: '450px',
      data: leaveType
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getLeaveType();
    });
  }
  ngOnInit() {
    this.getLeaveType();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

const ELEMENT_DATA: Element[] = [];
