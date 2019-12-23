import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SecionService} from '../../academics/section/section.webservice';


@Component({
  selector: 'app-section-student-dialog',
  templateUrl: './section-student-dialog.component.html',
  styleUrls: ['./section-student-dialog.component.scss']
})
export class SectionStudentDialogComponent implements OnInit {
  registerForm: FormGroup;
  registerFormErrors: any;
  sectionLists:any;
  onNoClick(){
    this.dialogRef.close();
  }
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<SectionStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private webservice:SecionService) { 
     this.sectionList(data.semesterid)
    }
    sectionList(data){
      var dataJson ={
        semesterId:data
      }
      this.webservice.getSectionlist(dataJson).subscribe(res=>{
console.log(JSON.stringify(res.data))
this.sectionLists = res.data;
      })
        
    }
studentIds:any;
    addStudent(){
      this.studentIds = [];
      for(var i =0 ;i< this.data.dataStudent.length;i++){
 this.studentIds.push({
  studentId:this.data.dataStudent[i].studentId,
  sectionId:this.registerForm.value.sectionId
 })
      }
       this.webservice.AddSectionstudentlist(this.studentIds).subscribe(res=>{
        alert(JSON.stringify(res))
      })
    }
  ngOnInit() {
    this.createForm();
  }
  createForm(){
    this.registerForm = this.formBuilder.group({
      sectionId           : ['', Validators.required],
     
  
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
}
