import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../core/services/config.service';
import { fuseAnimations } from '../../../../core/animations';
import {WebService} from '../../../../core/services/webservice'
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations : fuseAnimations
  
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFormErrors: any;
  loginto(){
       this.webService.LoginUser(this.loginForm.value).subscribe(res=> {
 if(res.status == true){
      this.webService.setTokken(res.data.tokenId)
    this.router.navigate(['home'])
     this.webService.setUserId(res.data.userId)
    this.webService.setUserName(res.data.name)

    name
}   
   })
  }
  constructor(
      private webService: WebService,
      private fuseConfig: FuseConfigService,
      private formBuilder: FormBuilder,
      private router:Router
  )
  {
      this.fuseConfig.setSettings({
          layout: {
              navigation: 'top',
        //    toolbar   : 'none',
             footer    : 'below'
          }
      });

      this.loginFormErrors = {
          email   : {},
          password: {}
      };
  }
  
  ngOnInit()
  {
      this.loginForm = this.formBuilder.group({
          email   : ['', [Validators.required, Validators.email]],
          password: ['', Validators.required]
      });

      this.loginForm.valueChanges.subscribe(() => {
          this.onLoginFormValuesChanged();
      });
  }

  onLoginFormValuesChanged()
  {
      for ( const field in this.loginFormErrors )
      {
          if ( !this.loginFormErrors.hasOwnProperty(field) )
          {
              continue;
          }

          // Clear previous errors
          this.loginFormErrors[field] = {};

          // Get the control
          const control = this.loginForm.get(field);

          if ( control && control.dirty && !control.valid )
          {
              this.loginFormErrors[field] = control.errors;
          }
      }
  }

}
