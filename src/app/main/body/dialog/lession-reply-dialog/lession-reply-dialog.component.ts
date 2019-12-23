import { Component, OnInit,Inject,VERSION } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SubjectService} from '../../subject/SubjectWebservice';

@Component({
  selector: 'app-lession-reply-dialog',
  templateUrl: './lession-reply-dialog.component.html',
  styleUrls: ['./lession-reply-dialog.component.scss']
})
export class LessionReplyDialogComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private webservice:SubjectService , private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LessionReplyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.createlessionForm();
     }
    createlessionForm(){
      this.registerForm = this.formBuilder.group({
        description           : ['', Validators.required],
        status           : ['', Validators.required],

    
      });
     }
  ngOnInit() {
  }
  onNoClick(){
    
  }
  UpdateTask(){
     this.webservice.LessionPostStatus( this.registerForm.value).subscribe(res=>{
       alert(JSON.stringify(res))
     })
  }
}
