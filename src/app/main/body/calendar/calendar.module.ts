import { NgModule } from '@angular/core';  

import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FuseCalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FuseCalendarEventFormDialogComponent } from './event-form/event-form.component';
 import { CalendatTypeComponent } from './calendat-type/calendat-type.component'
import {CalendarTypeDialogComponent} from '../dialog/calendar-type-dialog/calendar-type-dialog.component';
import { ColorPickerModule } from 'ngx-color-picker';
import {CalendarWebService} from './calendarWebService';
import { HttpClientModule } from '@angular/common/http';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { DatePipe } from '@angular/common';
 const routes: Routes = [
    {
        path     : 'event',
        component: FuseCalendarComponent,
        children : [],
        resolve  : {
            chat: CalendarService
        }
    },  {
        path     : 'type',
        component: CalendatTypeComponent,
         
    },{        path      : '',
    redirectTo: 'type'
}
    
];

@NgModule({
    imports        : [
        SharedModule,
        RouterModule.forChild(routes),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
          })
      ,
          HttpClientModule 
 
    ],
    declarations   : [
        FuseCalendarComponent,
        FuseCalendarEventFormDialogComponent,CalendarTypeDialogComponent,
         
        
        CalendatTypeComponent

    ],
    providers      : [
        CalendarService,ColorPickerModule,CalendarWebService,DatePipe

    ],
    entryComponents: [FuseCalendarEventFormDialogComponent,CalendarTypeDialogComponent]
})
export class FuseCalendarModule
{
}
