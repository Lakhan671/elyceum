import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
 import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
  import {TeacherWebService} from '../../academics/teacher/teacherWebservice'
@Component({
    selector     : 'dialog1',
    templateUrl  : './event-form.component.html',
    styleUrls    : ['./event-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TeacherDialogComponent implements OnInit
{
    event: any;
    dialogTitle: string;
    eventForm: FormGroup;
    action: string;
 
    constructor(
        public dialogRef: MatDialogRef<TeacherDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        private webService:TeacherWebService
     )
    {
         
        this.event = data.event;
        this.action = data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = this.event.title;
        }
        else
        {
            this.dialogTitle = 'New Event';
         }
         this.eventForm = this.createEventForm();

     }

    ngOnInit()
    {
    }
     createEventForm(){
        return new FormGroup({
            fName : new FormControl( ),
            mName : new FormControl( ),
            lName   : new FormControl( ),
            emial: new FormControl( ),
            mobileNo :  new FormControl( ),
            contactNo1: new FormControl( ),
            contactNo2:new FormControl( )        ,
            image: new FormControl( )        ,
            prmZipCode:new FormControl( )        ,
            currentZipCode:new FormControl( )        ,
            password:new FormControl( )        });

            
    }
    updateEventForm(){
        
            return new FormGroup({
                fName : new FormControl( this.event.fName),
                mName : new FormControl( this.event.mName),
                lName   : new FormControl( this.event.lName),
                emial: new FormControl( this.event.emial),
                mobileNo :  new FormControl(this.event.mobileNo ),
                contactNo1: new FormControl(this.event.contactNo1 ),
                contactNo2:new FormControl( this.event.contactNo2)        ,
                image: new FormControl( this.event.image)        ,
                prmZipCode:new FormControl( this.event.prmZipCode)        ,
                currentZipCode:new FormControl( this.event.currentZipCode)        ,
                password:new FormControl( this.event.password)        });
    
                
        
    }
    createTeacher(){
        this.eventForm.value.contactNo2 = this.eventForm.value.contactNo1 ;
        this.eventForm.value.teacherTypeId = '1';
 this.eventForm.value.usertype = '1';
this.webService.SaveTeacher(this.eventForm.value).subscribe(res=>{
    alert(JSON.stringify(res));
})
 
    }
   
}
 
