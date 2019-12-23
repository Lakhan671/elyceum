import { Component, OnInit } from '@angular/core';
 import { FuseConfigService } from '../../../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../../../core/animations';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
 import {SubjectService} from '../../../../SubjectWebservice'
 import {LessionReplyDialogComponent} from '../../../../../dialog/lession-reply-dialog/lession-reply-dialog.component'

 import {
  MatTableDataSource
} from '@angular/material';
import {Router} from '@angular/router'
@Component({
  selector: 'app-lession-detail',
  templateUrl: './lession-detail.component.html',
  styleUrls: ['./lession-detail.component.scss'],
  animations   : fuseAnimations 

})
export class LessionDetailComponent implements OnInit {
  projectdetail:any;
  lessiondetail:any;
unitdetail:any;
  constructor(private webservice:SubjectService , private fuseConfig:FuseConfigService ,private dialog:MatDialog) { 
    this.projectdetail = this.webservice.getProjectId;
     this.unitdetail = this.webservice.gettunitId;
     this.lessiondetail = this.webservice.gettlessionId
 this.lessionDetails();
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  }); 
  }
  lessiondetailcomment:any;
  lessionDetails(){
    this.webservice.LessionDetail({}).subscribe(res=>{
      console.log(JSON.stringify(res))
      this.lessiondetailcomment = res.data.lessionStatus
    })
  }
  replyLession(){ let dialogRef = this.dialog.open(LessionReplyDialogComponent, {
    width: '350px',
   data: {  type:'category',action:'create'   }
});
dialogRef.afterClosed().subscribe(result => {

 });}
   
   
 
 
 
  ngOnInit() {
  }

}
