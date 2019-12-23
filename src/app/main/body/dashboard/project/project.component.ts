import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
 import * as shape from 'd3-shape';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { fuseAnimations } from '../../../../core/animations';
import { ProjectWebService } from './project.webservice';

@Component({
    selector     : 'fuse-project',
    templateUrl  : './project.component.html',
    styleUrls    : ['./project.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FuseProjectComponent implements OnInit, OnDestroy
{
    projects: any[];
 
    widgets: any;
    bardata: any = {};

    widget5: any = {};
    widget6: any = {};
    widget7: any = {};
    widget8: any = {};
    widget9: any = {};
    widget11: any = {};
coursecount:any = {
    department:0,
    courses:0,
    NoOfStudent:0
};
    dateNow = Date.now();
userName:any = '';
datacoursedept:any;
studentcount:any;
leaveListcount:number= 0;
teacherLeaveCount:number = 0;
studentLeaveCount:number = 0;

stafLeaveCount : number = 0;
leaveGet(){
    this.WebService.getLeave().subscribe(res=>{
            if(res.data["1"]){
                if(res.data["1"]){
                    this.teacherLeaveCount = res.data["1"].length;
        
                }
                if(res.data["2"]){
                    this.studentLeaveCount = res.data["2"].length;
        
                }
                if(res.data["3"]){
                    this.stafLeaveCount = res.data["3"].length;
        
                }  
            }else{
                this.teacherLeaveCount =0;
                this.studentLeaveCount =0;
                this.stafLeaveCount =0;
            }
        
          this.leaveListcount  = this.teacherLeaveCount+this.studentLeaveCount+this.stafLeaveCount;
                    })
}
firstDayOfYear:any;
today:any;
pastDaysOfYear:any;
weekdays:['Monday','Tudesday']
 getNumberOfWeek() {
    this.today = new Date();
    this.firstDayOfYear = new Date(this.today.getFullYear(), 0, 1);
    this.pastDaysOfYear = (this.today - this.firstDayOfYear) / 86400000;
    return Math.ceil((this.pastDaysOfYear + this.firstDayOfYear.getDay() + 1) / 7)-1;
}
studentWeeklyGet(){
    this.bardata = {title: 'Student Leave',
    "ranges":{
     "TW":"This Week",
     "LW":"Last Week",
     "2W":"2 Weeks Ago"
     },"mainChart":{
         "2W":[],
         "LW":[],
         "TW":[]
         }  

}
   this.WebService.getStudentWeekly().subscribe(res=>{
       console.log(JSON.stringify(res))
       for(var i =0 ;i<res.data.length;i++){
 
            if(res.data[i].week == this.getNumberOfWeek()){
             
                this.bardata.mainChart.TW.push({
                    
                 "name":res.data[i].day,
                 "series":[
                     {
                     "name":"Present",
                     "value":res.data[i].present
                     },
                     {
                     "name":"Leave",
                     "value":res.data[i].absent
                     }]
             
                })
            }
             if((res.data[i].week ) == this.getNumberOfWeek()-1){
               
                this.bardata.mainChart.LW.push({
                    
                    "name":res.data[i].day,
                    "series":[
                        {
                        "name":"Present",
                        "value":res.data[i].present
                        },
                        {
                        "name":"Leave",
                        "value":res.data[i].absent
                        }]
                
                   })
            }
            if(res.data[i].week  == this.getNumberOfWeek()-2){
                 this.bardata.mainChart['2W'].push({
                    
                    "name":res.data[i].day,
                    "series":[
                        {
                        "name":"Present",
                        "value":res.data[i].present
                        },
                        {
                        "name":"Leave",
                        "value":res.data[i].absent
                        }]
                
                   })
            }
       }
       console.log(JSON.stringify(this.bardata))
        
      
})
}
    constructor(private WebService:ProjectWebService )
    { 
        this.studentWeeklyGet();
        this.WebService.getDashboard().subscribe(res=>{
            this.coursecount = JSON.parse(res.data);
            this.WebService.getDashboardStudent().subscribe(res1=>{
                if(res1.data){
                    this.studentcount = JSON.parse(res1.data);
                    if(this.studentcount.NoOfStudent){
                        this.coursecount.NoOfStudent = this.studentcount.NoOfStudent;

                    }else{
                        this.coursecount.NoOfStudent =0;
                    }
    
                }else{
                    this.studentcount = 0;
                    this.coursecount.NoOfStudent = 0;
 
                }
                this.leaveGet();
                        })
        })
      
           this.userName =  this.WebService.userName;
 
 
 
        /**
         * Widget 5
         */
        this.widget5 = {
            currentRange  : 'TW',
            xAxis         : true,
            yAxis         : true,
            gradient      : false,
            legend        : false,
            showXAxisLabel: false,
            xAxisLabel    : 'Days',
            showYAxisLabel: false,
            yAxisLabel    : 'Isues',
            scheme        : {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            onSelect      : (ev) => {
                console.log(ev);
            },
            supporting    : {
                currentRange  : '',
                xAxis         : false,
                yAxis         : false,
                gradient      : false,
                legend        : false,
                showXAxisLabel: false,
                xAxisLabel    : 'Days',
                showYAxisLabel: false,
                yAxisLabel    : 'Isues',
                scheme        : {
                    domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
                },
                curve         : shape.curveBasis
            }
        };

        /**
         * Widget 6
         */
        this.widget6 = {
            currentRange : 'TW',
            legend       : false,
            explodeSlices: false,
            labels       : true,
            doughnut     : true,
            gradient     : false,
            scheme       : {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63']
            },
            onSelect     : (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 7
         */
        this.widget7 = {
            currentRange: 'T'
        };

        /**
         * Widget 8
         */
        this.widget8 = {
            legend       : false,
            explodeSlices: false,
            labels       : true,
            doughnut     : false,
            gradient     : false,
            scheme       : {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107']
            },
            onSelect     : (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 9
         */
        this.widget9 = {
            currentRange  : 'TW',
            xAxis         : false,
            yAxis         : false,
            gradient      : false,
            legend        : false,
            showXAxisLabel: false,
            xAxisLabel    : 'Days',
            showYAxisLabel: false,
            yAxisLabel    : 'Isues',
            scheme        : {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            curve         : shape.curveBasis
        };

        setInterval(() => {
            this.dateNow = Date.now();
        }, 1000);

    }
//       getLocation() {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(this.showPosition);
//         } else {
//          }
//     }
//     latitude:any;
//     longitude:any;
// datalocation(){
//     this.WebService.setLat("Test");

// }
//       showPosition(position) {
// this.datalocation()
//       }
    // getWeather(){
    //     this.WebService.weathergetData(  this.latitude,this.longitude).subscribe(res=>{
    //         console.log(res)
    //     })
    // }
    ngOnInit()
    {

        /**
         * Widget 11
         */
         this.eventType();
        // this.widget11.onContactsChanged = new BehaviorSubject({});
        // this.widget11.onContactsChanged.next(this.widgets.widget11.table.rows);
        // this.widget11.dataSource = new FilesDataSource(this.widget11);
    }

    ngOnDestroy()
    {
    }
    eventTypes:any={};
    eventType(){
        this.WebService.getCalenderType().subscribe(res=>{
            this.eventTypes = (res.data)
        })

    }
    eventget(data){


    }

}

export class FilesDataSource extends DataSource<any>
{
    constructor(private widget11)
    {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]>
    {
        return this.widget11.onContactsChanged;
    }

    disconnect()
    {
    }
}

