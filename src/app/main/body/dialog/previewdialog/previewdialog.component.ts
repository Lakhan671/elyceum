import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-previewdialog',
  templateUrl: './previewdialog.component.html',
  styleUrls: ['./previewdialog.component.scss']
})
export class PreviewdialogComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(public dialogRef: MatDialogRef<PreviewdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  ) { 
this.imageChangedEvent =data.image
    }
    imageCropped(event: any) {
      console.log(event)
      this.croppedImage = event.base64;
  }
  AddFeeType(){

  }
  imageLoaded() {
      // show cropper
  }
  loadImageFailed() {
      // show message
  }
  
  ngOnInit() {
  }

}
