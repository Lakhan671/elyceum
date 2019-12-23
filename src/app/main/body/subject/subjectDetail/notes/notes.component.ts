import { Component, OnInit ,ElementRef,ViewChild,VERSION } from '@angular/core';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
 import {SubjectService} from '../../SubjectWebservice'
 import {UnitDialogComponent} from '../../../dialog/unit-dialog/unit-dialog.component'
 import {
  MatTableDataSource
} from '@angular/material';
import { FuseConfirmDialogComponent } from '../../../../../core/components/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  animations   : fuseAnimations

})
export class NotesComponent implements OnInit {
  displayedColumns = ['Sno', 'title', 'option'];

  @ViewChild(MatSort,   {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,   {static: true}) paginator: MatPaginator;
 @ViewChild('filter',   {static: true}) filter: ElementRef;
 dataSource = new MatTableDataSource < Element > (ELEMENT_DATA);
 confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
title:any;
  constructor(private WebService:SubjectService,private fuseConfig: FuseConfigService,private dialog:MatDialog) {
    this.title =this.WebService.getProjectId.title
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });
   }
   addUser(){
    let dialogRef = this.dialog.open(UnitDialogComponent, {
      width: '350px',
     data: {  type:'note',action:'add' }
  });
 dialogRef.afterClosed().subscribe(result => {

   this.noteList();
   });
 

   }
   Update(data){
     let dialogRef = this.dialog.open(UnitDialogComponent, {
      width: '350px',
     data: {  type:'note',action:'update',data:data }
  });
 dialogRef.afterClosed().subscribe(result => {

   });
 

   }
   noteList(){
     this.WebService.notesGET().subscribe(res=>{
        if(res.data){
        this.dataSource = new MatTableDataSource < Element > (res.data);

       }else{
        this.dataSource = new MatTableDataSource < Element > ();

                }

     })
   }
   delete(data){
     this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
      disableClose: false
  });

  this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

  this.confirmDialogRef.afterClosed().subscribe(result => {
      if ( result )
      { 
        var dataa ={
          notesId:data.notesId
        }
        this.WebService.notesDelete(dataa).subscribe(res=>{
          alert(res)
        })
       }
   });
   }
  ngOnInit() {
    this.noteList();
  }

}
export interface Element {
}

const ELEMENT_DATA: Element[] = [];
