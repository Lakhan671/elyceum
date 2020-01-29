import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FuseConfigService } from '../../../../core/services/config.service';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../core/animations';
import { ElementRef, ViewChild, VERSION } from '@angular/core';
import { AtendanceWebService } from './attendance.webservice';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { CommonConstants } from '../../../common/common.constants'
import { ElyNotificationService } from "../../../common/notification.service";
@Component({
  selector: 'app-attendace',
  templateUrl: './attendace.component.html',
  styleUrls: ['./attendace.component.scss'],
  animations: fuseAnimations

})
export class AttendaceComponent implements OnInit {
  @Output()
  dateChange: EventEmitter<MatDatepickerInputEvent<any>>;
  displayedColumns = ['Sno', 'studentName', 'present'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  StudentLists: any;
  start: number;
  end: number; subjectLists: any;
  data: any;
  selectedsemesterId: any;
  sectionList: any;
  tableShow: boolean;
  dayList:any;
  selectedSubject:any;

  constructor(private elyNotificationService:ElyNotificationService,private translationLoader: FuseTranslationLoaderService,
    private fuseConfig: FuseConfigService, private webservice: AtendanceWebService) {
    this.translationLoader.loadTranslations();

    this.start = 0;
    this.tableShow = false;
    this.StudentLists = [];
    this.end = 100;
    this.data = { sectionId: '' };
    this.fuseConfig.setSettings({
      layout: {
        navigation: 'top',
        toolbar: 'above',
        footer: 'none'
      }
    });

  }
  dataSent: any;
  SaveAttendance() {
    this.dataSent  =JSON.parse(JSON.stringify(this.dataSource.data));
   // this.dataSent = this.dataSource.data;
    for (var i = 0; i < this.dataSent.length; i++) {
      if (this.dataSent[i].present == true) {
        this.dataSent[i].present = '1';
      } else {
        this.dataSent[i].present = '0';

      }

    }
    var dataJson = {
      lectureRoutineId: this.selectedSubject.lectureRoutineId,
      students: this.dataSent,
      subjectId: this.selectedSubject.subjectId
    }

    console.log(JSON.stringify(dataJson));
    this.webservice.StudentAttenceSave(dataJson).subscribe(res => {
      this.elyNotificationService.showNotification({ type: CommonConstants.SUCCESS, message: res.message});
    })
  }
  selectsubject(subject) {
    this.selectedSubject=subject;
  let date=new Date();
       let day=date.getDay()+1;
       let status=false;
       this.subjectLists.forEach(sub=> {
        if(sub.title===subject.title && day===sub.dayId){
          status=true;
        }
     });
     if(!status){
      this.elyNotificationService.showNotification({ type: CommonConstants.WARNING, message: subject.title+' is not your today lecture'});
     }else{
       this.studentGet(subject);
     }

    
  }

  studentGet(subject) {
    var dataJson = {
      sectionId: subject.sectionId
    }
    this.StudentLists = [];
    this.webservice.SectionStudentGet(dataJson).subscribe(res => {
      for (var i = 0; i < res.data.length; i++) {
        this.StudentLists.push({
          studentName: res.data[i].studentName,
          studentId: res.data[i].studentId,
          present: false
        })


      }
      this.tableShow = true;
      if (res.data.length > 0) {
        this.dataSource = new MatTableDataSource<any>(this.StudentLists);

      }

    })
  }
getDays(){
  this.webservice.getDays().subscribe(res => {
    console.log(JSON.stringify(res))
    this.dayList = res.data;
  })
}
uniqueSubject=[];
  getTeacherSubject(){
    this.webservice.getTeacherSubject().subscribe(res => {
      console.log(JSON.stringify(res))
      this.subjectLists = res.data;
      this.uniqueSubject= this.subjectLists.filter(
        (thing, i, arr) => arr.findIndex(t => t.title === thing.title) === i
      );
    })
  }
  
  ngOnInit() {
    this.getTeacherSubject();
    this.getDays();
  }

}
export interface Element {
}

const ELEMENT_DATA: Element[] = [];