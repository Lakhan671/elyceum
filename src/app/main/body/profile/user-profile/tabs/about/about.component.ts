import { Component, OnInit } from '@angular/core';
 import { fuseAnimations } from '../../../../../../core/animations';
 import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatSort} from '@angular/material';
import {ContactDialogComponent} from '../../../../dialog/profileDialog/contact-dialog/contact-dialog.component';
import {GeneralDialogComponent} from '../../../../dialog/profileDialog/general-dialog/general-dialog.component';
import {WorkDialogComponent} from '../../../../dialog/profileDialog/work-dialog/work-dialog.component';

@Component({
    selector   : 'fuse-profile-about',
    templateUrl: './about.component.html',
    styleUrls  : ['./about.component.scss'],
    animations : fuseAnimations
})
export class FuseProfileAboutComponent implements OnInit
{
    about: any;

    constructor(public dialog: MatDialog  ) {
          }
        
    ngOnInit() {

    }
    editInfortmation(type) {
        if(type == 'general') {
            let dialogRef = this.dialog.open(GeneralDialogComponent, {
                height: '350px',
                width: '550px',
                data: {    }
             });
            dialogRef.afterClosed().subscribe(result => {
            
            });
    
        }else if(type =='work'){
            let dialogRef = this.dialog.open(WorkDialogComponent, {
                height: '350px',
                width: '550px',
                data: {    }
             });
            dialogRef.afterClosed().subscribe(result => {
               
            });
        } else if(type =='contact'){
            let dialogRef = this.dialog.open(ContactDialogComponent, {
                height: '350px',
                width: '550px',
                data: {    }
             });
            dialogRef.afterClosed().subscribe(result => {

               });
        }
    }
}
