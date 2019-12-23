import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../core/services/config.service';
import { fuseAnimations } from '../../../../core/animations';
import { WebService } from '../../../../core/services/webservice';

@Component({
    selector   : 'fuse-register',
    templateUrl: './register.component.html',
    styleUrls  : ['./register.component.scss'],
    animations : fuseAnimations
})
export class RegisterComponent implements OnInit
{
    registerForm: FormGroup;
    registerFormErrors: any;
    hide:boolean;
    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private WebService:WebService
     )
    {  this.hide = true;
        
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'top',
                toolbar   : 'none',
                footer    : 'below'
            }
        });

        this.registerFormErrors = {
            name           : {},
            email          : {},
            cemail          : {},
            mobileNo: {},
            password       : {},
            passwordConfirm: {}
        };
    }

    ngOnInit()
    {
        this.registerForm = this.formBuilder.group({
            cname           : ['', Validators.required],
            email          : ['', [Validators.required, Validators.email]],
            cemail          : ['', [Validators.required, Validators.email]],
            mobileNo          : ['', [Validators.required]],
            usertype: ['', [Validators.required]],
            password       : ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPassword]]
        });

        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });
    }

    onRegisterFormValuesChanged()
    {
        for ( const field in this.registerFormErrors )
        {
            if ( !this.registerFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.registerFormErrors[field] = {};

            // Get the control
            const control = this.registerForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.registerFormErrors[field] = control.errors;
            }
        }
    }
    registerUser(){
        // alert(JSON.stringify(this.registerForm.value));
        console.log(JSON.stringify(this.registerForm.value))
        this.WebService.CreateUser(this.registerForm.value).subscribe(res => {
  if ( res.status == true) {
    this.WebService.alertDialog(res.message, 'auth/login');
}else {
    this.WebService.alertDialog(res.message, 'auth/register');
}
        })}}
function confirmPassword(control: AbstractControl)
{
    if ( !control.parent || !control )
    {
        return;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return;
    }

    if ( passwordConfirm.value === '' )
    {
        return;
    }

    if ( password.value !== passwordConfirm.value )
    {
        return {
            passwordsNotMatch: true
        };
    }
}
