import { Component, OnInit,ViewEncapsulation,ElementRef, NgZone, ViewChild  } from '@angular/core';
import { FormControl } from '@angular/forms';
 import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-work-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent implements OnInit {
     
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

   onNoClick(){
    
  }
}
