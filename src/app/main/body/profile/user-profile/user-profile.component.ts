 
import { Component, OnInit, ViewEncapsulation,ElementRef, NgZone, ViewChild } from '@angular/core';
import { fuseAnimations } from '../../../../core/animations';
import { FuseConfigService } from '../../../../core/services/config.service';
 import { FormControl } from '@angular/forms';
 import { MapsAPILoader } from '@agm/core';
 import { MatPaginator, MatSort,MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {PreviewdialogComponent} from '../../dialog/previewdialog/previewdialog.component'
@Component({
  selector     : 'user-profile',
  templateUrl  : './user-profile.component.html',
  styleUrls    : ['./user-profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class UserProfileComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search",   {static: true})
  public searchElementRef: ElementRef;

  constructor(private fuseConfig:FuseConfigService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public dialog: MatDialog  

  ) {
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });
  }
  fileToUpload: File = null;

  ngOnInit() { 
  }
  uploadFileToActivity() {
  }
openpriviewDialog(){
  
  let dialogRef = this.dialog.open(PreviewdialogComponent, {
    height: '400px',
    width: '600px',
    data: { image:this.imageChangedEvent   }
 });
dialogRef.afterClosed().subscribe(result => {
 });

}
  imageChangedEvent: any = '';
  croppedImage: any = '';
  
  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      this.openpriviewDialog()
      console.log((this.imageChangedEvent))
  }
 AddFeeType
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
