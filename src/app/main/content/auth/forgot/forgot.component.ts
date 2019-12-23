import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../core/services/config.service';
import { fuseAnimations } from '../../../../core/animations';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'], 
     animations : fuseAnimations
  
})
export class ForgotComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  forgotPasswordFormErrors: any;

  constructor(
      private fuseConfig: FuseConfigService,
      private formBuilder: FormBuilder
  )
  {
      this.fuseConfig.setSettings({
          layout: {
              navigation: 'top',
              toolbar   : 'none',
              footer    : 'below'
          }
      });

      this.forgotPasswordFormErrors = {
          email: {}
      };
  }

  ngOnInit()
  {
      this.forgotPasswordForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]]
      });

      this.forgotPasswordForm.valueChanges.subscribe(() => {
          this.onForgotPasswordFormValuesChanged();
      });
  }

  onForgotPasswordFormValuesChanged()
  {
      for ( const field in this.forgotPasswordFormErrors )
      {
          if ( !this.forgotPasswordFormErrors.hasOwnProperty(field) )
          {
              continue;
          }

          // Clear previous errors
          this.forgotPasswordFormErrors[field] = {};

          // Get the control
          const control = this.forgotPasswordForm.get(field);

          if ( control && control.dirty && !control.valid )
          {
              this.forgotPasswordFormErrors[field] = control.errors;
          }
      }
  }

}
