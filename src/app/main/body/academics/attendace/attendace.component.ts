import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { FuseConfigService } from '../../../../core/services/config.service';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../core/animations';
 import {    ElementRef,  ViewChild,VERSION } from '@angular/core';
 import {AtendanceWebService} from './attendance.webservice';
 import {MatDatepickerInputEvent} from '@angular/material/datepicker';
 import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA ,MatTableDataSource} from '@angular/material';
 
@Component({
  selector: 'app-attendace',
  templateUrl: './attendace.component.html',
  styleUrls: ['./attendace.component.scss'],
  animations : fuseAnimations

})
export class AttendaceComponent implements OnInit {
  @Output()
  dateChange: EventEmitter<MatDatepickerInputEvent<any>> ;
  displayedColumns = ['Sno', 'studentName', 'present', 'absent'];
   @ViewChild(MatPaginator,   {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource < Element > (ELEMENT_DATA);
StudentLists:any;
 start:number;
end:number;    subjectLists: any;
data:any;
selectedsemesterId:any;
sectionList:any;
tableShow:boolean;

  constructor( private translationLoader: FuseTranslationLoaderService, 
         private fuseConfig: FuseConfigService,private webservice:AtendanceWebService) { 
          this.translationLoader.loadTranslations();

     this.start =0;
     this.tableShow  =false;
    this.StudentLists = [];
    this.end=100;
    this.data ={sectionId:''};
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });
  
  }
  dataSent:any;
  SaveAttendance(){
  
    console.log(this.dataSource.data);
    this.dataSent= this.dataSource.data;
    for(var i =0 ;i<this.dataSent.length;i++){
      if(this.dataSent[i].present == true){
        this.dataSent[i].present = '1';
      }else{
        this.dataSent[i].present = '0';

      }

    }
     var dataJson = {
      lectureRoutineId:this.lectureRoutingId,
      students:this.dataSent,
      subjectId:this.subjectLists[0].subjectId 
    }
     
    console.log(JSON.stringify(dataJson));
    this.webservice.StudentAttenceSave(dataJson).subscribe(res=>{
      alert(JSON.stringify(res));
     })
  }
  selectsubject(){
    this.data.date = new Date();
    if(this.data.date && this.data.subjectId){
       this.data.month=     this.data.date.getMonth();
      this.data.year=     this.data.date.getFullYear();
      this.data.day = this.data.date.getDay() +1;

       
this.lectureroutineGet();
    }
  }
  lectureRoutingId:any;
  lectureroutineGet(){
     var showtoSection = 0;
    this.webservice.LectureGet().subscribe(res=>{
       for(var i =0 ;i<res.data.length;i++){
         
        if(res.data[i].subjectName == this.data.subjectId){
for( var j =0 ;j<res.data[i].lecture.length ; j++){
   if(res.data[i].lecture[j].dayId == this.data.day ){
    
    this.selectedsemesterId = res.data[i].lecture[j].semesterId;
   this.lectureRoutingId = res.data[i].lecture[j].lectureRoutineId;
   if(showtoSection == 0){
    this.sectionGet();
    showtoSection = 1;
   }
 
  }

}
        }
      }
    })
  }

  sectionGet(){
  var dataJson = {
    semesterId:this.selectedsemesterId
  }
    this.webservice.sectionList(dataJson).subscribe(res=>{
  
        this.sectionList = res.data;

    
     })
  }
  
  studentGet(){
    var dataJson = {
      sectionId:this.data.sectionId
    }
     this.StudentLists = [];
    this.webservice.SectionStudentGet(dataJson).subscribe(res=>{
        for(var i =0 ;i<res.data.length;i++){
        this.StudentLists.push({
          studentName:res.data[i].studentName,
          studentId:res.data[i].studentId,
          present:false,
          absent:false
        })


      }
      this.tableShow  =true;
if(res.data.length>0){
  this.dataSource = new MatTableDataSource < any > (this.StudentLists);

}

    })
  }
subjectget(){
  var dataJson ={
    start:this.start,
    end:this.end
  }
  this.webservice.Subjectget(dataJson).subscribe(res=>{
console.log(JSON.stringify(res))
this.subjectLists = res.data;
  })
}
  ngOnInit() {
    this.subjectget();
  }

}
export interface Element {
}

const ELEMENT_DATA: Element[] = [];