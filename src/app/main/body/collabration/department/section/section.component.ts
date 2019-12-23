import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
 import { fuseAnimations } from '../../../../../core/animations';
import { FuseConfigService } from '../../../../../core/services/config.service';
   import {ColabrationService} from '../../collabarationweservice'
  import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
 import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
 import { FuseUtils } from '../../../../../core/fuseUtils';
  import {SectionDialogComponent} from '../../../../body/dialog/section-dialog/section-dialog.component';
  import {
  MatTableDataSource
} from '@angular/material';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  animations   : fuseAnimations
  
})
export class SectionComponent implements OnInit {

  displayedColumns = ['Sno', 'sectionName', 'option'];
  @ViewChild(MatSort,   {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,   {static: true}) paginator: MatPaginator;
 @ViewChild('filter',   {static: true}) filter: ElementRef;
  productsService: any;
  ELEMENT_DATA: any;
  dataSource = new MatTableDataSource < Element > (ELEMENT_DATA);

  constructor(private web: ColabrationService,
     private fuseConfig: FuseConfigService,
    public dialog: MatDialog,
    public router:Router
  ) { 
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });

  }
  CourseSelect(data){
     this.web.setDepartment(data.departmentId)
    this.router.navigate(['collabration/department/course'])
  }
addUser(){
  let dialogRef = this.dialog.open(SectionDialogComponent, {
    height: '350px',
    width: '450px',
    data: {  type:'create'  }
 });
dialogRef.afterClosed().subscribe(result => {
this.getdepList();
});
}
update(data){
   let dialogRef = this.dialog.open(SectionDialogComponent, {
    height: '350px',
    width: '450px',
    data: {  type:'update',sectionName: data.sectionName,roomId:data.roomId,semesterId:data.semesterId}
 });
dialogRef.afterClosed().subscribe(result => {
this.getdepList();
});

}
  ngOnInit() {
    this.getdepList();
  }
getdepList(){
  var dataJson ={
    semesterId:this.web.getSem
  }
  this.web.getsSection(dataJson).subscribe(res=>{
      this.dataSource = new MatTableDataSource < Element > (res.data);

  })
}
applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}
}
export interface Element {
}

const ELEMENT_DATA: Element[] = [];
