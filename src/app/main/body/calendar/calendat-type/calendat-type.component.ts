 import { fuseAnimations } from '../../../../core/animations';
 import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
  import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
 import { FuseConfigService } from '../../../../core/services/config.service';
 import {CalendarTypeDialogComponent} from '../../../body/dialog/calendar-type-dialog/calendar-type-dialog.component';
  import {
  MatTableDataSource
} from '@angular/material';
import {
  Router
} from '@angular/router';
import {CalendarWebService} from '../calendarWebService'
 @Component({
  selector: 'app-calendat-type',
  templateUrl: './calendat-type.component.html',
  styleUrls: ['./calendat-type.component.scss'],
  animations   : fuseAnimations

})
export class CalendatTypeComponent implements OnInit {
  displayedColumns = ['Sno', 'calendertype', 'option'];
  @ViewChild(MatSort,   {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,   {static: true}) paginator: MatPaginator;
 @ViewChild('filter',   {static: true}) filter: ElementRef;
  productsService: any;
  ELEMENT_DATA: any;
  dataSource = new MatTableDataSource < Element > (ELEMENT_DATA);
  eventCourseSelect(data){
     this.WebService.seteventType(data.calenderTypeId);
     this.route.navigate(['calendar/event']);
  }
  constructor(             public dialog: MatDialog,
    private fuseConfig: FuseConfigService,
    private WebService:CalendarWebService,
    private route:Router
  ) {         this.fuseConfig.setSettings({
    layout: {
        navigation: 'top',
    toolbar   : 'above',
       footer    : 'none'
    }
});
}
addUser(){
  let dialogRef = this.dialog.open(CalendarTypeDialogComponent, {
    height: '250px',
    width: '300px',
    data: {  type:'create'  }
 });
dialogRef.afterClosed().subscribe(result => {
  this.calendarTypeList();

 });
}
update(data){
    let dialogRef = this.dialog.open(CalendarTypeDialogComponent, {
    height: '250px',
    width: '300px',
    data: {  type:'update' ,calenderType:data.calendertype,calenderTypeId:data.calenderTypeId }
 });
dialogRef.afterClosed().subscribe(result => {
  this.calendarTypeList();

 });
}
calendarLis:any;
calendarTypeList(){
  this.WebService.getCalenderType().subscribe(res=>{
     this.calendarLis =res.data;
    this.dataSource = new MatTableDataSource < Element > (this.calendarLis);
  })
}

  ngOnInit() {
    this.calendarTypeList();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
const ELEMENT_DATA: Element[] = [];
