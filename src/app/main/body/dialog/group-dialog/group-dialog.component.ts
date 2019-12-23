import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {WebService} from '../../../../core/services/webservice'

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss']
})
export class GroupDialogComponent implements OnInit {

  registerForm: FormGroup;
  registerFormErrors: any;
  onNoClick(){
    this.dialogRef.close();
  }
  createUser(){
alert(JSON.stringify(this.registerForm.value));
this.WebService.addUser(this.registerForm.value).subscribe(res=>{
alert(JSON.stringify(res));
})
  }

  friendLisst:any;

  constructor( private formBuilder: FormBuilder, public dialogRef: MatDialogRef<GroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private WebService:WebService ) {
     if(data.option){
      if(data.option == 'member'){
        this.getFriendList();
        this.creatememberForm();
      }else{
        if(data.type == 'create'){
          this.createForm();
        }else if(data.type == 'update'){
          this.updatememberForm(data.data);
        }
      this.registerFormErrors = {
        name           : {}
      };
      }
     }else{
      if(data.type == 'create'){
        this.createForm();
      }else if(data.type == 'update'){
        this.updateForm(data.data);
      }
    this.registerFormErrors = {
      name           : {}
    };
     }
      
     

   }
   creatememberForm(){
    this.registerForm = this.formBuilder.group({
      userId           : ['', Validators.required],
     
  
    });
   }
   updatememberForm(data){
    this.registerForm = this.formBuilder.group({
      userId           : ['', Validators.required],
     
  
    });
   }
   Addmember(){

     this.WebService.groupmemberAdd(this.registerForm.value).subscribe(res =>{
      this.dialogRef.close();
      this.WebService.alertDialog(res.message,'group/member');
    
    })
   }
   getFriendList (){
 
     this.WebService.getFrientList().subscribe(res=>{
 
this.friendLisst = res.data;
     })
   }
createForm(){
  this.registerForm = this.formBuilder.group({
    groupName           : ['', Validators.required],
   

  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
} 
updateForm(data){
  this.registerForm = this.formBuilder.group({
    groupName           : [data.title, Validators.required],
   

  });

this.registerForm.valueChanges.subscribe(() => {
    this.onRegisterFormValuesChanged();
});
}
usertypeList:any;
createGroup(){ 
  
  this.WebService.groupcreate(this.registerForm.value).subscribe(res=>{
this.WebService.alertDialog(res.message,'/group');
this.dialogRef.close();

  })
}
updateGroup(){ 
  this.registerForm.value.groupId = this.data.data.groupId;
  this.WebService.groupupdate(this.registerForm.value).subscribe(res=>{
this.WebService.alertDialog(res.message,'/group');
this.dialogRef.close();

  })
}
  ngOnInit() { 
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
