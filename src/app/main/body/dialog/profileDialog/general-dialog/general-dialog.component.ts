import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-general-dialog',
  templateUrl: './general-dialog.component.html',
  styleUrls: ['./general-dialog.component.scss']
})
export class GeneralDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<GeneralDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      dialogRef.disableClose = false;
 
    }
  onNoClick(){
    this.dialogRef.close();

  }
  ngOnInit() {
  }

}
