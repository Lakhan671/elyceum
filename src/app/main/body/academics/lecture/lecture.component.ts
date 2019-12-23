import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '../../../../core/services/config.service';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../core/animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LectureWebService} from './lecture.webservice'
import {LectureDialogComponent} from '../../dialog/lecture-dialog/lecture-dialog.component';
import { MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss'],
  animations   : fuseAnimations

})
export class LectureComponent implements OnInit {

  constructor(private fuseConfig: FuseConfigService, private web: LectureWebService, public dialog: MatDialog) {
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });

   }
   dayLists:any;
dayList(){
this.web.getDayList().subscribe(res=>{
 this.dayLists = res.data;
 console.log(JSON.stringify(this.dayLists))
 this.lectureRoutine();
})
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
  var data ={teacherId:"1"};
  

  this.web.getlectureList(data).subscribe(res=>{
    this.lectureRoutineList1 = []

    this.lectureRoutineList = res.data;
    console.log(JSON.stringify(this.lectureRoutineList));
   for(var i =0 ; i<this.lectureRoutineList.length;i++){
    this.lectureRoutineList1.push({})
     this.lectureRoutineList1[i].subjectName = this.lectureRoutineList[i].subjectName;
     this.lectureRoutineList1[i].lecture = []

     for(var j =0 ;j< 7;j++){
      this.lectureRoutineList1[i].lecture.push({lectureTime:'',roomId:''})      
    }
    for(var j =0;j<this.lectureRoutineList[i].lecture.length;j++){
      if(this.lectureRoutineList[i].lecture[j].dayId == 1){
        this.lectureRoutineList1[i].lecture[0] =this.lectureRoutineList[i].lecture[j];
      }
      if(this.lectureRoutineList[i].lecture[j].dayId == 2){
        this.lectureRoutineList1[i].lecture[1] =this.lectureRoutineList[i].lecture[j];
      }
      if(this.lectureRoutineList[i].lecture[j].dayId == 3){
        this.lectureRoutineList1[i].lecture[2] =this.lectureRoutineList[i].lecture[j];
      }
      if(this.lectureRoutineList[i].lecture[j].dayId == 4){
        this.lectureRoutineList1[i].lecture[3] =this.lectureRoutineList[i].lecture[j];
      }
      if(this.lectureRoutineList[i].lecture[j].dayId == 5){
        this.lectureRoutineList1[i].lecture[4] =this.lectureRoutineList[i].lecture[j];
      }
      if(this.lectureRoutineList[i].lecture[j].dayId == 6){
        this.lectureRoutineList1[i].lecture[5] =this.lectureRoutineList[i].lecture[j];
      }
      if(this.lectureRoutineList[i].lecture[j].dayId == 7){
        this.lectureRoutineList1[i].lecture[6] =this.lectureRoutineList[i].lecture[j];
      }
     }
   }
console.log(JSON.stringify(this.lectureRoutineList1))
  })
}
  ngOnInit() {
  this.dayList();
  }

}
