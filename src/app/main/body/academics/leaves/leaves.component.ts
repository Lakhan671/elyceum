import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '../../../../core/services/config.service';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../core/animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LeavesWebService} from './leaves.webservice'
import {LectureDialogComponent} from '../../dialog/lecture-dialog/lecture-dialog.component';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-lecture',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss'],
  animations   : fuseAnimations

})
export class LeavesComponent implements OnInit {

  constructor(private fuseConfig: FuseConfigService, private web: LeavesWebService, public dialog: MatDialog) {
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });

   }

addleave(){
  let dialogRef = this.dialog.open(LectureDialogComponent, {
     width: '650px',
    data: {  type:'create'   }
 });
dialogRef.afterClosed().subscribe(result => {
 
 });
}
  ngOnInit() {
 
  }

}
