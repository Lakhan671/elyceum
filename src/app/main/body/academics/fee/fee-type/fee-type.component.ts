import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { FuseTranslationLoaderService } from '../../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../../core/animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
 import {  ElementRef,ViewChild,VERSION } from '@angular/core';
 import {FeeTypeDialogComponent} from '../../../dialog/fee-type-dialog/fee-type-dialog.component'
 import {
  MatTableDataSource
} from '@angular/material';
import {
  Router
} from '@angular/router';
import {feeWebService} from '../feeWebservice'
@Component({
  selector: 'app-fee-type',
  templateUrl: './fee-type.component.html',
  styleUrls: ['./fee-type.component.scss'],
  animations : fuseAnimations

})
export class FeeTypeComponent implements OnInit {
  displayedColumns = ['Sno', 'instalmentType','option'];

  @ViewChild(MatSort,   {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,   {static: true}) paginator: MatPaginator;
 @ViewChild('filter',   {static: true}) filter: ElementRef;
 dataSource = new MatTableDataSource < Element > (ELEMENT_DATA);
 
 constructor(private fuseConfig: FuseConfigService, private Route: Router,  public dialog: MatDialog  ,private web:feeWebService
  ) {
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });
   }
   getFeetype(){
     this.web.getfeeType().subscribe(res=>{
      this.dataSource = new MatTableDataSource < Element > (res.data);
    })
  }
  selectSubject(data){
    this.web.setfeeType(data);
    this.Route.navigate(['Academics/fee'])

   }
   addUser(){
    let dialogRef = this.dialog.open(FeeTypeDialogComponent, {
      height: '300px',
      width: '450px',
      data: {  type:'create'  }
   });
  dialogRef.afterClosed().subscribe(result => {
   });
 
  }
    
  ngOnInit() {
    this.getFeetype();

  }

}

const ELEMENT_DATA: Element[] = [];
