import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { FuseTranslationLoaderService } from '../../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../../core/animations';
import { AbstractControl, FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
 import {LectureDialogComponent} from '../../../dialog/lecture-dialog/lecture-dialog.component';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {AtendanceWebService} from '../attendance.webservice';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {  Moment} from 'moment';

 
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-attendance-history',
  templateUrl: './attendance-history.component.html',
  styleUrls: ['./attendance-history.component.scss'],
  animations   : fuseAnimations,
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AttendanceHistoryComponent implements OnInit {
date = new FormControl(new Date() );
start:number;
end:number;    subjectLists: any;
data:any;
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    
    ctrlValue.year(normalizedYear.year());
    
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normlizedMonth.month());
    this.date.setValue(ctrlValue);
    this.selectsubject();
     datepicker.close();
  }
  attendanceGet(){
    var data ={
      "lectureRoutineId":6,"month":this.data.month,"year":this.data.year

    };
     this.web.StudentAttenceGet(data).subscribe(res=>{
         this.studentdatedata(res.data);
    })
  }
  count:any;
  studentData :any;
  studentAttendanceList:any;
  studentdatedata(data){
    console.log(JSON.stringify(data))
     this.studentData =[];
    if(this.data.month == 1){
      this.count  = 31;
    }else if(this.data.month == 2){
      if(this.data.year % 4 == 0){
        this.count  = 29;
      }else{
        this.count  = 28;
      }
      
    }else if(this.data.month == 3){
      this.count  = 31;
    }else if(this.data.month == 4){
      this.count  = 30;
    }else if(this.data.month == 5){
      this.count  = 31;
    }else if(this.data.month == 6){
      this.count  = 30;
    }else if(this.data.month == 7){
      this.count  = 31;
    }else if(this.data.month == 8){
      this.count  = 31;
    }else if(this.data.month == 9){
      this.count  = 30;
    }else if(this.data.month == 10){
      this.count  = 31;
    }else if(this.data.month == 11){
      this.count  = 30;
    }else if(this.data.month == 12){
      this.count  = 31;
    }
 
    for(var i =0 ;i<this.count;i++){
      this.studentData.push({
        attendenceId:'',
        present:2
      })
    }
for(var j =0 ;j< data.length;j++){

  
    if(data[j].attendance.length>0){
      for(var k =0 ;k<data[j].attendance.length ;k++){
          this.studentData[new Date(data[j].attendance[k].date).getDate() -1]   = data[j].attendance[k]
         
      }
    }
  
    data[j].attendance = this.studentData;
 }
 this.studentAttendanceList = data;
   }
  constructor(private fuseConfig: FuseConfigService, private web: AtendanceWebService, public dialog: MatDialog) {
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });
  this.data ={};
  this.start =0;
  this.end=100;

   }
   dayLists:any;
dayList(){ 
}
addUser(){
  let dialogRef = this.dialog.open(LectureDialogComponent, {
     width: '650px',
    data: {  type:'create'   }
 });
dialogRef.afterClosed().subscribe(result => {
  this.lectureRoutine();
 });
}
lectureRoutineList:any;
lectureRoutineList1:any;
lectureRoutine(){ 
}
subjectget(){
  var dataJson ={
    start:this.start,
    end:this.end
  }
  this.web.Subjectget(dataJson).subscribe(res=>{
 
this.subjectLists = res.data;
  })
}
selectsubject(){
  if(  this.data.subjectId && this.date.value){
    this.data.month=     this.date.value.getMonth() + 1;
    this.data.year=     this.date.value.getFullYear();
    this.data.day = this.date.value.getDay() +1;
 
    
this.lectureroutineGet();
 }
}
lectureRoutingId:any;
lectureroutineGet(){
  var showtoSection = 0;
 this.web.LectureGet().subscribe(res=>{
    for(var i =0 ;i<res.data.length;i++){
        
     if(res.data[i].subjectName == this.data.subjectId){
 
 
 if(res.data[i].lecture.length>0){
    this.lectureRoutingId = res.data[i].lecture[0].lectureRoutineId;
  this.attendanceGet();
  
   
 }
 

  
 
     }
   }
 })
}
  ngOnInit() {
   this.subjectget();
  }
  

}
