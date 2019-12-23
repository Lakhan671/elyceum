import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CalendarEvent } from 'angular-calendar';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CalendarEventModel } from '../event.model';
import { MatColors } from '../../../../core/matColors';
import {CalendarWebService} from '../calendarWebService'

@Component({
    selector     : 'fuse-calendar-event-form-dialog',
    templateUrl  : './event-form.component.html',
    styleUrls    : ['./event-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FuseCalendarEventFormDialogComponent implements OnInit
{
    event: any;
    dialogTitle: string;
    eventForm: FormGroup;
    action: string;
    presetColors = MatColors.presets;

    constructor(
        public dialogRef: MatDialogRef<FuseCalendarEventFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        private webService:CalendarWebService
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
            this.event = new CalendarEventModel({
                start: data.date,
                end  : data.date
            });
        }

        this.eventForm = this.createEventForm();
    }

    ngOnInit()
    {
    }

    createEventForm()
    {
         return new FormGroup({
            title : new FormControl( this.event.title),
            start : new FormControl( this.event.start),
            end   : new FormControl( this.event.end),
            allDay: new FormControl( false),
            color1 :  new FormControl(this.event.color.primary ),
                color2: new FormControl(this.event.color.secondary ),
                remark:new FormControl( this.event.meta.notes)        });
    }
    createCalendarEvent(){
        this.eventForm.value.calenderTypeId = this.data.calenderTypeId;
         this.webService.saveCalender(this.eventForm.value).subscribe(res=>{
              this.webService.alertDialog(res.message,'/calendar/event')
             this.dialogRef.close();

         })

    }
    update(){
        
        this.eventForm.value.calenderTypeId = this.data.calenderTypeId;
        this.eventForm.value.calendarId = this.event.calendarId
         
        this.webService.updateCalender(this.eventForm.value).subscribe(res=>{
             this.webService.alertDialog(res.message,'/calendar/event')
this.dialogRef.close();
        })

    }
}
