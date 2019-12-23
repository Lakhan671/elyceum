import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FuseConfigService } from '../../../../core/services/config.service';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../core/animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {feeWebService} from './feeWebservice'
import {
  MatTableDataSource
} from '@angular/material';
import {FeeDialogComponent} from '../../dialog/fee-dialog/fee-dialog.component'

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss'],
  animations : fuseAnimations

})

export class FeeComponent implements OnInit {
  displayedColumns = ['Sno', 'instalmentType','option'];
  @ViewChild(MatSort,   {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,   {static: true}) paginator: MatPaginator;
 @ViewChild('filter',   {static: true}) filter: ElementRef;
 dataSource = new MatTableDataSource < Element > (ELEMENT_DATA);
 addUser(){
  let dialogRef = this.dialog.open(FeeDialogComponent, {
    height: '500px',
    width: '600px',
    data: {  type:'create'  }
 });
dialogRef.afterClosed().subscribe(result => {
 });

}
registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private translationLoader: FuseTranslationLoaderService,    
      private fuseConfig: FuseConfigService,private web:feeWebService,private dialog:MatDialog) {

        this.registerForm = this.formBuilder.group({
          feetypeId  : [''],
        })
        this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });
   }
getFee(){
  
   this.web.getfee(this.registerForm.value).subscribe(res=>{
console.log(JSON.stringify(res))
  })
}
  ngOnInit() {
    this.registerForm.controls['feetypeId'].setValue(this.web.getfeeTypesession.instalmentTypeId);
    this.getFee();
  }

}
const ELEMENT_DATA: Element[] = [];
