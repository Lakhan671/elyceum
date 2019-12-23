import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '../../../../core/services/config.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollegeSettingService } from './college.service';
import { WebService } from './collegewebservice'
@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.scss']
})
export class CollegeComponent implements OnInit {
  registerForm: FormGroup;
  registerFormErrors: any;
data:any;

  constructor(private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder,private collegeService:CollegeSettingService,
    private Web:WebService
) {
   // this.collegeService.getProjects
     this.Web.getCollege().subscribe(res=>{
        this.data = res.data;
     })
 
this.data = {
  data:{}
};
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });
 
  }
  saveCollege(data){
 
    this.Web.saveCollege(data).subscribe(res=>{
         this.Web.alertDialog(res.message, 'setting');

   })
}

  registerUser(){
   }
// createForm(){
//   this.registerForm = this.formBuilder.group({
//     name           : ['', Validators.required],
//     email          : ['', [Validators.required, Validators.email]],
//      mobileNo          : ['', [Validators.required]],
//      collegeCode: ['', [Validators.required]]    
// });
// }
// comonForm(){
//   this.registerForm = this.formBuilder.group({
//     fax           : ['', Validators.required],
//     ICp          : ['', [Validators.required, Validators.email]],
//      country          : ['', [Validators.required]],
//      ctype: ['', [Validators.required]],
//      language: ['', [Validators.required]],
//      cuse: ['', [Validators.required]],
//      timeZone: ['', [Validators.required]]    
     
     
     
// });

// }
  ngOnInit() {
  
 
  }

}
