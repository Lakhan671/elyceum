import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '../../../../core/services/config.service';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../core/animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebService } from '../../../../core/services/webservice'
import { ElyNotificationService } from "../../../common/notification.service";
import { CommonConstants } from '../../../common/common.constants'
@Component({
  selector: 'app-group-post',
  templateUrl: './group-post.component.html',
  styleUrls: ['./group-post.component.scss']
})
export class GroupPostComponent implements OnInit {
  commentArayList: any;
  postData: any;
  replyArrayList: any;
  postArrayList: any;
  LikeArrayList: any;
  showReply: any;
  registerForm: FormGroup;
  registerFormErrors: any;
  cmtForm: FormGroup;
  cmtFormErrors: any;
  replycmtForm: FormGroup;
  replycmtFormErrors: any;
  start: number;
  end: number;
  continue: any;

  NewsList: any;
  showUpdate: boolean;
  showText: boolean;
  PostcmtSend: any;
  PostcmtreplySend: any;
  constructor(
    private elyNotificationService: ElyNotificationService,
    private translationLoader: FuseTranslationLoaderService,
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder, private Webservice: WebService) {
    this.continue = true;
    this.showText = true;
    this.showReply = false;
    this.fuseConfig.setSettings({
      layout: {
        navigation: 'top',
        toolbar: 'above',
        footer: 'none'
      }
    }); this.start = 0;
    this.end = 5;

    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required]

    });
    this.cmtForm = this.formBuilder.group({
      commentText: [''],

    });
    this.replycmtForm = this.formBuilder.group({
      cmntText: [''],

    });
  }
  userId: any;
  newsCreate() {
    //  this.Webservice.NewsSave(this.registerForm.value).subscribe(res=>{

    //   this.postGet();
    //   this.registerForm = this.formBuilder.group({
    //     title           : ['', Validators.required],
    //     text           : ['', Validators.required] 

    //   });

    //  })
  }


  postGet() {
    this.Webservice.groupmsgGet(0, 10).subscribe(res => {
      console.log(JSON.stringify(res.data))
      if (res.data.length == 5) {

      } else {
        this.continue = false;
      }
      this.scrolldata(res.data);
    })
  }
  postGetList() {
    this.Webservice.groupmsgGet(0, this.start + 5).subscribe(res => {
      this.postArrayList = res.data;

    })
  }

  setFocus(event) {
    console.log(event);
  }
  ngOnInit() {
    this.userId = this.Webservice.getUserId;
    this.showUpdate = false;
    this.postGet();
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
    // this.Webservice.NewsUpdate(this.registerForm.value).subscribe(res => {

    //       this.showUpdate = false;
    //       this.postGet();
    //       this.registerForm = this.formBuilder.group({
    //         title           : ['', Validators.required],
    //         text           : ['', Validators.required] 

    //       });

    // });
  }

  //post comment
  groupPost() {
    let data = {
      postData: this.postData
      
    }
    this.Webservice.groupmsgPost(data).subscribe(res => {
      this.elyNotificationService.showNotification({ type: CommonConstants.SUCCESS, message: res.message });
      //this.Webservice.alertDialog(res.message,'/group/Post')
      this.postGetList();
      this.cmtForm.reset();
      this.postData='';

    })
  }

  groupPostShare(post){
    let currentDate=new Date();
    let request = {
      postData: post.postData,
      createdDate:currentDate,
      updatedDate:currentDate,
      postByuserId:post.postByuserId
    }
this.Webservice.groupPostShare(request).subscribe(res => {
  this.elyNotificationService.showNotification({ type: CommonConstants.SUCCESS, message: res.message });
  //this.Webservice.alertDialog(res.message,'/group/Post')
  this.postGetList();
  this.cmtForm.reset();
  this.postData='';

})
  }
groupPostLike(post){
  let request = {
    likeData:'@',
    groupPostId: post.gpId,
    postByuserId:post.postByuserId
  }
this.Webservice.groupmsgPostLike(request).subscribe(res => {
this.elyNotificationService.showNotification({ type: CommonConstants.SUCCESS, message: res.message });
//this.Webservice.alertDialog(res.message,'/group/Post')
this.postGetList();
this.cmtForm.reset();
this.postData='';
})
  }

  postCommentSend(data) {
    if (this.cmtForm.value.commentText) {

    } else { return false; }
    let data1 = {
      commentText: this.cmtForm.value.commentText,
      groupPostId: data.gpId, noOfLike: '0'
    }
    this.Webservice.groupmsgPostCommentSend(data1).subscribe(res => {
      this.elyNotificationService.showNotification({ type: CommonConstants.SUCCESS, message: res.message });
      // this.Webservice.alertDialog(res.message,'/group/Post')
      this.postGetList();
      this.cmtForm.reset();

    })
  }
  reply(data) {
    let data2 = {
      cmntText: this.replycmtForm.value.cmntText,
      groupcmntId: data.commentId,
      noOfLike: '0'
    }

    this.Webservice.groupmsgReplyPost(data2).subscribe(res => {
      // this.Webservice.alertDialog(res.message,'/group/Post')
      this.elyNotificationService.showNotification({ type: CommonConstants.SUCCESS, message: res.message });
      this.postGetList();
        this.replycmtForm.reset();
    })
  }
  scrolldata(data) {

    if (this.start == 0) {
      this.postArrayList = data;


    } else {
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          this.postArrayList.push(data[i])

        }
      }
    }

    console.log(this.postArrayList)
  }

  public handleScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      console.log(this.continue)
      if (this.continue) {
        this.start = this.start + 5;
        this.postGet()

      }
    }

  }
}
