import { Component, OnInit,ViewEncapsulation,ElementRef, NgZone, ViewChild  } from '@angular/core';
import { FormControl } from '@angular/forms';
 import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-work-dialog',
  templateUrl: './work-dialog.component.html',
  styleUrls: ['./work-dialog.component.scss']
})
export class WorkDialogComponent implements OnInit {
     
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search",   {static: true})
  public searchElementRef: ElementRef;

  public handleAddressChange() {
  // Do some stuff
}

  constructor(    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
) { }


ngOnInit() { 
}

private setCurrentPosition() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 12;
    });
  }
}  onNoClick(){
    
  }
}
