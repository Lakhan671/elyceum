import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '../../../core/services/config.service';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../core/animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from './homeWeService';
import { ElyNotificationService } from "../../common/notification.service";
import { CommonConstants } from '../../common/common.constants'
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  animations: fuseAnimations

})
export class NewsComponent implements OnInit {
  registerForm: FormGroup;
  registerFormErrors: any;
  NewsList: any;
  showUpdate: boolean;

  constructor(private translationLoader: FuseTranslationLoaderService,
    private elyNotificationService: ElyNotificationService,
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder, private Webservice: HomeService) {
    this.fuseConfig.setSettings({
      layout: {
        navigation: 'top',
        toolbar: 'above',
        footer: 'none'
      }
    });
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required]

    });

  }
  like(news){
    let newsDate=new Date();
    let likeRequest={
      nId:news.nId,
      like_text:'@',
      createdDate:newsDate,
      updatedDate:newsDate
    }
    this.Webservice.newsLike(likeRequest).subscribe(res => {
      this.elyNotificationService.showNotification({ type: CommonConstants.INFO, message: res.message });
      this.newsGet();
    });
  }
  userId: any;
  newsCreate() {
    this.Webservice.NewsSave(this.registerForm.value).subscribe(res => {
      this.elyNotificationService.showNotification({ type: CommonConstants.INFO, message: res.message });
      this.newsGet();
      this.registerForm = this.formBuilder.group({
        title: ['', Validators.required],
        text: ['', Validators.required]

      });

    });
  }
  newsGet() {
    this.Webservice.Newsget().subscribe(res => {
      this.NewsList = res.data;
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
      title: [data.title, Validators.required],
      text: [data.text, Validators.required],
      nId: [data.nId]
    });
    this.showUpdate = true;

  }
  update() {
    this.Webservice.NewsUpdate(this.registerForm.value).subscribe(res => {
      this.elyNotificationService.showNotification({ type: CommonConstants.INFO, message: res.message });
      this.showUpdate = false;
      this.newsGet();
      this.registerForm = this.formBuilder.group({
        title: ['', Validators.required],
        text: ['', Validators.required]

      });
    });
  }
  newsCmntPost(news) {
    let date=new Date();
    let reqNewsCmnt={
      commentText:news.cmntText,
      newsId:news.nId,
      createdDate:date,
      updatedDate:date
    }
    this.Webservice.newsCmntPost(reqNewsCmnt).subscribe(res => {
      this.elyNotificationService.showNotification({ type: CommonConstants.INFO, message: res.message });
      this.newsGet();
    });
  }
}
