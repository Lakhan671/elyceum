
import { Component, OnInit ,ElementRef,ViewChild,VERSION } from '@angular/core';
import { FuseConfigService } from '../../../core/services/config.service';
import { fuseAnimations } from '../../../core/animations';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
 import {SubjectService} from './SubjectWebservice'
import {
  MatTableDataSource
} from '@angular/material';
import {
  Router
} from '@angular/router';
 @Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
  animations   : fuseAnimations

})
export class SubjectComponent implements OnInit {
  displayedColumns = ['Sno', 'title', 'category',  'priority','startDate','endDate','completed'];

  @ViewChild(MatSort,   {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,   {static: true}) paginator: MatPaginator;
 @ViewChild('filter',   {static: true}) filter: ElementRef;
 dataSource = new MatTableDataSource < Element > (ELEMENT_DATA);
 
 constructor(private fuseConfig: FuseConfigService, private Route: Router,private webservice:SubjectService) {
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });
   }
addUser() {
  this.Route.navigate(['subject/Create']);
  }
  getSubjectlist(start,end){
    var data  ={start:start,end:end}
    this.webservice.Subjectget(data).subscribe(res=>{
      console.log(JSON.stringify(res.data));
      this.dataSource = new MatTableDataSource < Element > (res.data);

    })
  }
  selectSubject(data){
    this.webservice.setProjectId(data)
    this.Route.navigate(['subject/Detail'])

  }
  ngOnInit() {
    this.getSubjectlist(0,20);
  }

}
export interface Element {
}

const ELEMENT_DATA: Element[] = [];
