import { Component, OnInit ,ElementRef,ViewChild,VERSION } from '@angular/core';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
 import {SubjectService} from '../../SubjectWebservice'
 import {
  MatTableDataSource
} from '@angular/material';
import {Router} from '@angular/router'
@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
  animations   : fuseAnimations 
})
export class UnitComponent implements OnInit {
  displayedColumns = ['Sno', 'lessionName','startDate','endDate','status', 'option'];
lessionList:any;
  @ViewChild(MatSort,   {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,   {static: true}) paginator: MatPaginator;
 @ViewChild('filter',   {static: true}) filter: ElementRef;
 dataSource = new MatTableDataSource < Element > (ELEMENT_DATA);
 title:any;
  constructor(private Router:Router,private WebService:SubjectService,private fuseConfig: FuseConfigService,private dialog:MatDialog) {
    this.title = this.WebService.getProjectId.title;
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  }); 
   };
   unitList:any;
unitGetList(){
  var data ={
    subjectId:this.WebService.getProjectId.subjectId
  }

  this.WebService.UnitGet(data).subscribe(res=>{
   this.unitList =  res.data;
  })
}
lessionDetail(data){
 
  this.WebService.setLession(data);
  this.Router.navigate(['/subject/Detail/lession/detail'])
}
addtask(data){
  
  this.WebService.setunitId(data);
   this.Router.navigate(['/subject/Detail/lession/create'])
};
edittask(data){
   this.WebService.setLession(data);
  this.Router.navigate(['/subject/Detail/lession/edit'])
}
lession(data){
  this.WebService.setunitId(data);

  this.WebService.LessonGet(data).subscribe(res=>{
 this.lessionList = res.data;
this.dataSource = new MatTableDataSource < Element > (this.lessionList);

  })
}
  ngOnInit() {
    this.unitGetList();
  }
  editlession(){

  }
}
export interface Element {
}

const ELEMENT_DATA: Element[] = [];
