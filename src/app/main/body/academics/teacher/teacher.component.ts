 import { FuseConfigService } from '../../../../core/services/config.service';
 import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
 import { fuseAnimations } from '../../../../core/animations';
 import { Component, ElementRef, OnInit, ViewChild, VERSION } from '@angular/core';

 import {TeacherDialogComponent} from '../../dialog/teacher-dialog/event-form.component';
 import {TeacherWebService} from '../../academics/teacher/teacherWebservice';
 import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
 import {
    MatTableDataSource
  } from '@angular/material';
 @Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  animations : fuseAnimations

})
export class TeacherComponent implements OnInit {

  constructor(   private WebService:TeacherWebService, public dialog: MatDialog,
    private translationLoader: FuseTranslationLoaderService,      private fuseConfig: FuseConfigService) { 
    this.fuseConfig.setSettings({
    layout: {
        navigation: 'top',
    toolbar   : 'above',
       footer    : 'none'
    }
});
}
  displayedColumns = ['Sno','image', 'Name','email','contactNo1', 'option'];

  @ViewChild(MatSort,   {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,   {static: true}) paginator: MatPaginator;
 @ViewChild('filter',   {static: true}) filter: ElementRef;
 dataSource = new MatTableDataSource < Element > (ELEMENT_DATA);
depList:any;
update(){
}
addUser(){
  let dialogRef = this.dialog.open(TeacherDialogComponent, {
     width: '650px',
    data: {  type:'create'   }
 });
dialogRef.afterClosed().subscribe(result => {
 });
}
teacherList(){
  this.WebService.getlistTeacher().subscribe(res=>{
    console.log(JSON.stringify(res))
    this.dataSource = new MatTableDataSource < Element > (res.data);

  })
  }
  ngOnInit() {
    this.teacherList()
  }


}
 export interface Element {
}

 const ELEMENT_DATA: Element[] = [];
