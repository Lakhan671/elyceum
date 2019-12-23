import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { FuseTranslationLoaderService } from '../../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../../core/animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {SubjectService} from '../../SubjectWebservice';
@Component({
  selector: 'app-assignment-question',
  templateUrl: './assignment-question.component.html',
  styleUrls: ['./assignment-question.component.scss']
})
export class AssignmentQuestionComponent implements OnInit {

  constructor(private translationLoader: FuseTranslationLoaderService,
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder,private webService: SubjectService ) { 
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });
  this.registerForm = this.formBuilder.group({
    question           : ['', Validators.required],
    unitAsId:['']
 
  });

  }
  registerForm: FormGroup;
  registerFormErrors: any;
  NewsList:any;
  showUpdate:boolean;
  userId :any;
  newGetList:any;
  newsCreate(){ 
    this.registerForm.value.unitAsId =  this.webService.gettunitId.unitId
    this.webService.AssignmentQuestionADD(this.registerForm.value).subscribe(res=>{
       this.webService.alertDialog(res.data.message,'subject/Detail/Unit/assignment/question');
    })
  }
  newsGet(){ 

    this.webService.AssignmentQuestionGet().subscribe(res=>{
      console.log(JSON.stringify(res.data));
      this.newGetList = res.data
    })
  }
  setFocus(event){
    console.log(event);
  }
  ngOnInit() {  
    this.newsGet();
this.showUpdate = false;
  }
   editNews(data) {
     
    this.registerForm = this.formBuilder.group({
      title           : [data.title, Validators.required],
      text           : [data.text, Validators.required],
      nId         :          [data.nId]
    });
    this.showUpdate = true;

  }
  update() { 
  }

}
