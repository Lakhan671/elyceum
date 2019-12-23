import { Component, OnInit ,ElementRef,ViewChild,VERSION } from '@angular/core';
import { FuseConfigService } from '../../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../../core/animations';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
 import {SubjectService} from '../../../SubjectWebservice'
 import {
  MatTableDataSource
} from '@angular/material';
@Component({
  selector: 'app-lession',
  templateUrl: './lession.component.html',
  styleUrls: ['./lession.component.scss']
})
export class LessionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
