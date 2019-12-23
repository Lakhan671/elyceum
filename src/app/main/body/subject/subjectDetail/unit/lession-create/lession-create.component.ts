import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '../../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../../core/animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MatDialog  } from '@angular/material';
import {UnitDialogComponent} from '../../../../dialog/unit-dialog/unit-dialog.component'
import {SubjectService} from '../../../SubjectWebservice'
import {
  Router
} from '@angular/router';
 
@Component({
  selector: 'app-lession-create',
  templateUrl: './lession-create.component.html',
  styleUrls: ['./lession-create.component.scss'],
  animations   : fuseAnimations

})
export class LessionCreateComponent implements OnInit {
  registerForm: FormGroup;
  registerFormErrors: any;
  tiles: any;
  unitList:any;
  createForm(){
     this.registerForm = this.formBuilder.group({
      startDate           : [''],
      endDate           : [''],
      hourlyWorking           : [''],
      estimateTime           : [''],
      private           : [''],
      title           : [''],
      description           : [''],
      estimatedTimeMinute           : [''],
      status           : [''],
      private1:[false],
      hour1:[false],
      hour:[""],
 
       });
   this.registerForm.valueChanges.subscribe(() => {
      this.onRegisterFormValuesChanged();
  });
  }
  updateForm(data){
      console.log(data)
     this.registerForm = this.formBuilder.group({
        startDate           : [new Date(data.startDate)],
        endDate           : [new Date(data.endDate)],
        hourlyWorking           : [new Date(data.endDate)],
        estimateTime           : [data.estimateTime],
        private           : [data.private],
        title           : [data.lessionName],
        description           : [data.lessionDescription],
        estimatedTimeMinute           : [data.estimatedTimeMinute],
        status           : [data.status],
        private1:[false],
        hour1:[false],
        hour:[data.endDate],
   
         });
     this.registerForm.valueChanges.subscribe(() => {
        this.onRegisterFormValuesChanged();
    });
  }
  onRegisterFormValuesChanged()
  {
      for ( const field in this.registerFormErrors )
      {
          if ( !this.registerFormErrors.hasOwnProperty(field) )
          {
              continue;
          }

          // Clear previous errors
          this.registerFormErrors[field] = {};

          // Get the control
          const control = this.registerForm.get(field);

          if ( control && control.dirty && !control.valid )
          {
              this.registerFormErrors[field] = control.errors;
          }
      }
  }
  projectdetail:any;
  unitdata:any;
  lessionDetail:any;
  constructor(private webservice:SubjectService,private dialog:MatDialog,private fuseConfig: FuseConfigService, private Route: Router, private formBuilder: FormBuilder) {
   this.projectdetail = this.webservice.getProjectId;
   this.unitdata = this.webservice.gettunitId;
   this.lessionDetail = this.webservice.gettlessionId;
 if(window.location.pathname == '/subject/Detail/lession/create'){

    this.createForm();

}else{

    this.updateForm(this.lessionDetail);

}
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });
  this.unitList =[];

  this.tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  this.registerFormErrors = {
    name           : {},
    email          : {},
    cemail          : {},
    mobileNo: {},
    password       : {},
    passwordConfirm: {}
};

  }
createLession(){
    
    if(this.registerForm.value.private1  == true){
        this.registerForm.value.private = 'Yes'
    }else{
        this.registerForm.value.private = 'No'
    }
    if(this.registerForm.value.hour1 == true){
        this.registerForm.value.hourlyWorking = 'Yes'
    }else{
        this.registerForm.value.hourlyWorking = 'No'
    }
    this.registerForm.value.subjectId = this.projectdetail.subjectId;
    this.registerForm.value.unitId = this.unitdata.unitId;
     this.registerForm.value.estimateTime  = '0'
     this.registerForm.value.estimatedTimeMinute = '0';
      console.log(JSON.stringify(this.registerForm.value))
      this.webservice.LessonSave(this.registerForm.value).subscribe(res=>{
           this.webservice.alertDialog('Successfully created','subject/Detail/Unit/lession')

    })
}
  ngOnInit() {
  }

}
