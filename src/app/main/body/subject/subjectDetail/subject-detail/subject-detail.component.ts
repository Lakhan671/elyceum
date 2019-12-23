import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';
 import {SubjectService} from '../../SubjectWebservice'
@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss'],
  animations   : fuseAnimations

})
export class SubjectDetailComponent implements OnInit {
  single :any;
projectdetail:any;
  constructor(private WebService:SubjectService,private fuseConfig: FuseConfigService) {  
    this.projectdetail = this.WebService.getProjectId;
    console.log(JSON.stringify(this.projectdetail))
    this.single = [
      {
        "name": "Subject",
        "value": 50
      }  
    ]
    this.fuseConfig.setSettings({
    layout: {
        navigation: 'top',
    toolbar   : 'above',
       footer    : 'none'
    }
});
Object.assign(this, this.single)   

}
onResize(event) { this.view = [event.target.innerWidth - 900, 280 ]; }

 multi: any[];

view: any[] = [700, 316];

// options
showXAxis = true;
showYAxis = true;
gradient = false;
showLegend = true;
showXAxisLabel = true;
xAxisLabel = 'Country';
showYAxisLabel = true;
yAxisLabel = 'Population';

colorScheme = {
  domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
};

// line, area
autoScale = true;

 

onSelect(event) {
  console.log(event);
}
getprogectDetail(){
 }
  ngOnInit() {
    this.getprogectDetail();
  }

}
