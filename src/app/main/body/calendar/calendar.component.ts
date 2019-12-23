import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FuseCalendarEventFormDialogComponent } from './event-form/event-form.component';
import { FormGroup } from '@angular/forms';
import { CalendarEventModel } from './event.model';
import { CalendarService } from './calendar.service';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarMonthViewDay
} from 'angular-calendar';
import { FuseConfirmDialogComponent } from '../../../core/components/confirm-dialog/confirm-dialog.component';
import { fuseAnimations } from '../../../core/animations';
import { FuseConfigService } from '../../../core/services/config.service';
import {    Router  } from '@angular/router';
import {CalendarWebService} from './calendarWebService';
@Component({
    selector     : 'fuse-calendar',
    templateUrl  : './calendar.component.html',
    styleUrls    : ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FuseCalendarComponent implements OnInit
{
    view: string;
    viewDate: Date;
    events: CalendarEvent[];
    public actions: CalendarEventAction[];
    activeDayIsOpen: boolean;
    refresh: Subject<any> = new Subject();
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    selectedDay: any;

    constructor(
        private fuseConfig: FuseConfigService,
        public dialog: MatDialog,
        public calendarService: CalendarService,
        private WebService:CalendarWebService
    )
    {  this.fuseConfig.setSettings({
        layout: {
            navigation: 'top',
        toolbar   : 'above',
           footer    : 'none'
        }
    });
        this.view = 'month';
        this.viewDate = new Date();
        this.activeDayIsOpen = true;
        this.selectedDay = {date: startOfDay(new Date())};

        this.actions = [
            {
                label  : '<i class="material-icons s-16">edit</i>',
                onClick: ({event}: { event: any }): void => {
                    this.editEvent('edit', event);
                 }
            },
            {
                label  : '<i class="material-icons s-16">delete</i>',
                onClick: ({event}: { event: any }): void => {
                    this.deleteEvent(event);
                }
            }
        ];

        /**
         * Get events from service/server
         */
        this.eventTypeList();
    }
    eventId:any;
    calendaerList:any;
calendarevent(){
 this.calendaerList = [];
     var data ={calenderTypeId: this.eventId };
      
    this.WebService.getCalender(data).subscribe(res=>{
        
          for(var i =0 ;i<res.data.length ;i++){
this.calendaerList.push({
    "start":new Date(res.data[i].startDate),
    "end":new Date(res.data[i].endDate),
    "title":res.data[i].title,
    "allDay":false,
    "color":{"primary":res.data[i].color1,"secondary":res.data[i].color2},
    "resizable":{"beforeStart":true,"afterEnd":true},
    "draggable":true,"meta":{ 
        "notes":res.data[i].remark},
        calendarId:res.data[i].calendarId,
        calenderTypeId:''



    
})
        }
        
        this.events  =  this.calendaerList.map(item => {
             item.actions = this.actions;
            console.log(JSON.stringify(item))
             return new CalendarEventModel(item);
        });
 
    })

 
}
calendarTypeLis:any;
selectedType:any;
eventTypeList(){
    
    this.WebService.getCalenderType().subscribe(res=>{
        this.calendarTypeLis =res.data;
       if(this.WebService.geteventType){
        this.eventId = this.WebService.geteventType
        for(var i =0 ;i <res.data.length;i++){
            if(res.data[i].calenderTypeId ==  this.WebService.geteventType){
                this.selectedType = res.data[i];
                this.eventId = res.data[i].calenderTypeId;

            }
        }
        }else{
          this.selectedType = res.data[0]
          this.eventId = res.data[0].calenderTypeId;

        }
 
        this.calendarevent();

      })
}
selectedEvent(data){
  this.WebService.seteventType(data.calenderTypeId);
  this.selectedType = data;
 this.calendarevent();
}
    ngOnInit()
    {
         /**
         * Watch re-render-refresh for updating db
         */
     }

    setEvents()
    {
        this.events = this.calendarService.events.map(item => {
            item.actions = this.actions;
            console.log(JSON.stringify(item))
             return new CalendarEventModel(item);
        });
    }

    /**
     * Before View Renderer
     * @param {any} header
     * @param {any} body
     */
    beforeMonthViewRender({header, body})
    {
        // console.info('beforeMonthViewRender');
        /**
         * Get the selected day
         */
        const _selectedDay = body.find((_day) => {
            return _day.date.getTime() === this.selectedDay.date.getTime();
        });

        if ( _selectedDay )
        {
            /**
             * Set selectedday style
             * @type {string}
             */
            _selectedDay.cssClass = 'mat-elevation-z3';
        }

    }

    /**
     * Day clicked
     * @param {MonthViewDay} day
     */
    dayClicked(day: CalendarMonthViewDay): void
    {
        const date: Date = day.date;
        const events: CalendarEvent[] = day.events;

        if ( isSameMonth(date, this.viewDate) )
        {
            if ( (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0 )
            {
                this.activeDayIsOpen = false;
            }
            else
            {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
        this.selectedDay = day;
        this.refresh.next();
    }

    /**
     * Event times changed
     * Event dropped or resized
     * @param {CalendarEvent} event
     * @param {Date} newStart
     * @param {Date} newEnd
     */
    eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void
    {
        event.start = newStart;
        event.end = newEnd;
        // console.warn('Dropped or resized', event);
        this.refresh.next(true);
    }

    /**
     * Delete Event
     * @param event
     */
    deleteEvent(event)
    {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                const eventIndex = this.events.indexOf(event);
                this.events.splice(eventIndex, 1);
                this.refresh.next(true);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * Edit Event
     * @param {string} action
     * @param {CalendarEvent} event
     */
    editEvent(action: string, event: CalendarEvent)
    {
        const eventIndex = this.events.indexOf(event);

        this.dialogRef = this.dialog.open(FuseCalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data      : {
                event : event,
                action: action,
            calenderTypeId:this.selectedType.calenderTypeId

            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                this.calendarevent()
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Save
                     */
                    case 'save':

                        this.events[eventIndex] = Object.assign(this.events[eventIndex], formData.getRawValue());
                        this.refresh.next(true);

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteEvent(event);

                        break;
                }
            });
    }

    /**
     * Add Event
     */
    addEvent(): void
    {
        this.dialogRef = this.dialog.open(FuseCalendarEventFormDialogComponent, {
            panelClass: 'event-form-dialog',
            data      : {
                action: 'new',
                date  : this.selectedDay.date,calenderTypeId:this.selectedType.calenderTypeId
            }
        });
        this.dialogRef.afterClosed()
            .subscribe(() => { 
            });
    }
}


