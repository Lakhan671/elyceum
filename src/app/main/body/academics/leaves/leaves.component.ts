import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild, VERSION } from '@angular/core';
import { FuseConfigService } from '../../../../core/services/config.service';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../core/animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeavesWebService } from './leaves.webservice'
import { LectureDialogComponent } from '../../dialog/lecture-dialog/lecture-dialog.component';
import { CommonConstants } from '../../../common/common.constants'
import { ElyNotificationService } from "../../../common/notification.service";
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { LeaveTypeDialogComponent } from 'src/app/main/body/dialog/leave-type-dialog/leave-type-dialog.component';
import { DatePipe } from '@angular/common';
const ELEMENT_DATA: Element[] = [];
@Component({
  selector: 'app-lecture',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss'],
  animations: fuseAnimations

})
export class LeavesComponent implements OnInit {
  displayedColumns = ['Sno', 'name', 'title', 'text', 'from', 'to', 'status', 'approvedPendding', 'action'];
  seachOption = [{ type: "Pendding", value: 0 }, { type: "Approved", value: 1 }, { type: "Rejected", value: 2 }, { type: "Date", value: 'date' }, { type: "Name", value: 'name' }];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  constructor(private datePipe: DatePipe, private elyNotificationService: ElyNotificationService, private fuseConfig: FuseConfigService, private web: LeavesWebService, public dialog: MatDialog) {

    this.fuseConfig.setSettings({
      layout: {
        navigation: 'top',
        toolbar: 'above',
        footer: 'none'
      }
    });

  }

  addleave() {
    let dialogRef = this.dialog.open(LeaveTypeDialogComponent, {
      width: '500px',
      height: '450px',
      data: { action: 'create', page: 'leave', header: 'Make A Leave Request...' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getLeaves(0, '');
    });
  }
  onChange(event, leave) {

  }
  getLeaves(type, soption) {
    let data = { name: null, date: null, approved: (type >= 0 ? type : null) };
    if (type === 'name') {
     // data.name = '%'+soption+'%';
      if (!soption) {
        return;
      }
    }
    if (type === 'date') {
      if (!soption) {
        return;
      }
      data.date = this.datePipe.transform(soption, 'yyyy-MM-dd');
    }
    this.web.getLeaves(data).subscribe(res => {
      this.dataSource = new MatTableDataSource<Element>(res.data);
    })
  }
  editLeave(leave) {
    let dialogRef = this.dialog.open(LeaveTypeDialogComponent, {
      width: '500px',
      height: '450px',
      data: { action: 'update', page: 'leave', header: 'Edit Leave ...',leave:leave}
    });
    dialogRef.afterClosed().subscribe(result => {
     // this.getLeaves(0, '');
    });
  }

  approveRejectLeave(event, leave) {
    let data = {
      approved: (event.checked == false ? 2 : 1),
      id: leave.id
    }
    this.web.approveLeave(data).subscribe(res => {
      leave.approved = (event.checked == false ? 2 : 1);
      this.elyNotificationService.showNotification({ type: CommonConstants.INFO, message: res.message });
    })
  }
  ngOnInit() {
    this.getLeaves(0, '');
  }

}
