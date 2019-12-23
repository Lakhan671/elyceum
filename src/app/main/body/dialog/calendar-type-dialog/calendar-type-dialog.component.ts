import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ColorPickerService} from 'ngx-color-picker';
import {CalendarWebService} from '../../calendar/calendarWebService'
@Component({
  selector: 'app-calendar-type-dialog',
  templateUrl: './calendar-type-dialog.component.html',
  styleUrls: ['./calendar-type-dialog.component.scss']
})
export class CalendarTypeDialogComponent implements OnInit {
  registerForm: FormGroup;
  registerFormErrors: any;
  onNoClick(){
    this.dialogRef.close();
  }
  createUser(){
  this.webService.saveCalenderType(this.registerForm.value).subscribe(res=>{
     this.webService.alertDialog(res.message,'calendar/type');
    this.dialogRef.close();
  })
  }
  updateUser(){
    this.registerForm.value.calenderTypeId = this.data.calenderTypeId;
    this.webService.updateCalenderType(this.registerForm.value).subscribe(res=>{
       this.webService.alertDialog(res.message,'calendar/type');
      this.dialogRef.close();
    })
    }private color: string = "#127bdc";
  
  
  constructor( private webService:CalendarWebService,private cpService: ColorPickerService,private formBuilder: FormBuilder, public dialogRef: MatDialogRef<CalendarTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any   ) {
       if(data.type == 'create'){
        this.createForm();
      }else if(data.type == 'update'){
        this.updateForm(data);
      }
    this.registerFormErrors = {
      calenderType           : {},
    };

   }
createForm(){
  this.registerForm = this.formBuilder.group({
    calenderType           : ['', Validators.required],
 
  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
}
updateForm(data){
  this.registerForm = this.formBuilder.group({
    calenderType           : [data.calenderType, Validators.required],
 
  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
}
usertypeList:any;
userTypeList(){
 }
  ngOnInit() {
    this.userTypeList();
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


}
