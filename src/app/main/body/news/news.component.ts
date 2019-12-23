import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '../../../core/services/config.service';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../core/animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HomeService} from './homeWeService';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  animations   : fuseAnimations

})
export class NewsComponent implements OnInit {
  registerForm: FormGroup;
  registerFormErrors: any;
  NewsList: any;
  showUpdate: boolean;

  constructor(private translationLoader: FuseTranslationLoaderService,
              private fuseConfig: FuseConfigService,
              private formBuilder: FormBuilder, private Webservice: HomeService) {
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });
    this.registerForm = this.formBuilder.group({
    title           : ['', Validators.required],
    text           : ['', Validators.required]

  });

  }
  userId: any;
  newsCreate() {
     this.Webservice.NewsSave(this.registerForm.value).subscribe(res => {
        this.newsGet();
       this.registerForm = this.formBuilder.group({
        title           : ['', Validators.required],
        text           : ['', Validators.required]

      });

     });
  }
  newsGet() {
    this.Webservice.Newsget().subscribe(res => {
       this.NewsList = res.data;
       console.log(JSON.stringify(this.NewsList));
     });
  }
  setFocus(event) {
    console.log(event);
  }
  ngOnInit() {
    this.userId = this.Webservice.getUser;
    this.newsGet();
    this.showUpdate = false;
  }
   editNews(data) {

    this.registerForm = this.formBuilder.group({
      title           : [data.title, Validators.required],
      text           : [data.text, Validators.required],
      nId         :          [data.nId]
    });
    this.showUpdate = true;

  }
  update() {
    this.Webservice.NewsUpdate(this.registerForm.value).subscribe(res => {
           this.showUpdate = false;
           this.newsGet();
           this.registerForm = this.formBuilder.group({
            title           : ['', Validators.required],
            text           : ['', Validators.required]

          });

    });
  }

}
