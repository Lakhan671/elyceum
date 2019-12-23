import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SubjectService} from '../../subject/SubjectWebservice'

@Component({
  selector: 'app-unit-dialog',
  templateUrl: './unit-dialog.component.html',
  styleUrls: ['./unit-dialog.component.scss']
})
export class UnitDialogComponent implements OnInit {
  registerForm: FormGroup;
  registerFormErrors: any;
title:any;
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<UnitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private webservice:SubjectService) { 
      if(data.type == 'category'){
        if(data.action =='create'){
          this.title = 'Category Create'
this.createCategoryForm();
        }else{
          this.title = 'Category Update'

        
        }
      }else if(data.type =='unit'){
        if(data.action == 'nothourly'){
          if(data.option == 'add'){
            let data =  {
              name:'',
              percentage:''
            }
            this.createUnithourForm(data)
this.title = 'Add Unit' ;
          }else if(data.option == 'edit'){
            this.createUnithourForm(data.selected)
            this.title = 'Edit Unit' ;

          }
        }
      }else if(data.type =='note'){
        
        if(data.action == 'add'){
          this.title = 'Create Note'
this.createnoteForm()
        }else{
          this.title = 'Update Note'
          this.updatenoteForm(data.data);
        }
      }
    }
    editunit(){
       
  let total = 0;
  this.data.data[this.data.index].percentage = this.registerForm.value.percentage
  this.data.data[this.data.index].name = this.registerForm.value.name

  if(this.data.data){
     if(this.data.data.length > 0){
      for(var i =0 ;i<this.data.data.length;i++){
         total = total+ JSON.parse(this.data.data[i].percentage);
      }
      
    }
  }
   total = total ;
  this.registerForm.value.total = total;
  this.data.totalvalue = total;
    if(total > 100){
    alert("unit percentage cannot be greater than 100 ")
  return false;
  }
  this.dialogRef.close(this.data)
    }
  ngOnInit() {
  }
  createnoteForm(){
 
    this.registerForm = this.formBuilder.group({
      title           : ['', Validators.required] ,
      description           : ['', Validators.required] 
 
   
    });
  
  this.registerForm.valueChanges.subscribe(() => {
      this.onRegisterFormValuesChanged();
  });
   
}
createnote(){
  this.registerForm.value.subjectId = this.webservice.getProjectId.subjectId
  this.webservice.notesSave(this.registerForm.value).subscribe(res=>{
     this.dialogRef.close(res.message)
    this.webservice.alertDialog(res.message,'subject/Detail/notes')

  })
}
updatenotefde(){
  
  this.registerForm.value.subjectId = this.webservice.getProjectId.subjectId
  this.webservice.notesUpdate(this.registerForm.value).subscribe(res=>{
     this.dialogRef.close(res.message)
    this.webservice.alertDialog(res.message,'subject/Detail/notes')

  })
}
updatenoteForm(data){
 
    this.registerForm = this.formBuilder.group({
      title           : [data.title, Validators.required] ,
      description           : [data.description, Validators.required] 

   
    });
  
  this.registerForm.valueChanges.subscribe(() => {
      this.onRegisterFormValuesChanged();
  });
   
}
createCategoryForm(){
 
    this.registerForm = this.formBuilder.group({
      name           : ['', Validators.required] 
   
    });
  
  this.registerForm.valueChanges.subscribe(() => {
      this.onRegisterFormValuesChanged();
  });
   
}
addunit(){
  let total = 0;
  if(this.data.data){
     
    if(this.data.data.length > 0){
      for(var i =0 ;i<this.data.data.length;i++){
       
        total = total+ JSON.parse(this.data.data[i].percentage);
      }
      
    }
  }
  total = total +JSON.parse(this.registerForm.value.percentage);
  this.registerForm.value.total = total;
    if(total > 100){
    alert("unit percentage cannot be greater than 100 ")
  return false;
  }
  this.dialogRef.close(this.registerForm.value)

}
createUnitForm(data){
 
  this.registerForm = this.formBuilder.group({
    name           : [data.name, Validators.required] ,
    percentage           : [data.percentage, Validators.required] 

  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
 
}
createUnithourForm(data){
 
  this.registerForm = this.formBuilder.group({
    name           : [data.name, Validators.required] ,
    percentage           : [data.percentage, Validators.required] 

  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
 
}
onNoClick(){
  this.dialogRef.close();
}
createCategory(){
   this.webservice.categorySave(this.registerForm.value).subscribe(res=>{
 this.webservice.alertDialog(res.message,'subject/Create')
    this.dialogRef.close();

  })
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
