import { Component, OnInit, HostListener } from '@angular/core';
import { FuseConfigService } from '../../../core/services/config.service';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../core/animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from './homeWeService'
import { FuseConfirmDialogComponent } from '../../../core/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import {CommonConstants} from '../../common/common.constants'
import { ElyNotificationService } from "../../common/notification.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: fuseAnimations

})
@HostListener('scroll', ['$event'])

export class HomeComponent implements OnInit {
  commentArayList: any;
  PostData: any;
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
  NewsList: any;
  showUpdate: boolean;
  showText: boolean;
  PostcmtSend: any;
  PostcmtreplySend: any;
  userName: any;
  continue: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  dialogRef: any;
  constructor(private translationLoader: FuseTranslationLoaderService,
    private fuseConfig: FuseConfigService,private elyNotificationService:ElyNotificationService,
    private formBuilder: FormBuilder, private Webservice: HomeService,public dialog: MatDialog) {
    this.continue = true;
    this.postArrayList = [];
    this.start = 0;
    this.end = 5;
    this.userName = this.Webservice.getuserName;
    this.showText = true;
    this.showReply = false;
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
    this.cmtForm = this.formBuilder.group({
      commentText: [''],

    });
    this.replycmtForm = this.formBuilder.group({
      replyText: [''],

    });
  }
  userId: any;
  newsCreate() {
    this.Webservice.NewsSave(this.registerForm.value).subscribe(res => {

      this.postGet();
      this.registerForm = this.formBuilder.group({
        title: ['', Validators.required],
        text: ['', Validators.required]

      });

    })
  }


  postGet() {
    this.Webservice.Postget(this.start, 5).subscribe(res => {
      if (res.data.post.length == 5) {

      } else {
        this.continue = false;
      }
      this.scrolldata(res.data.post);
    })
  }
  postGetList() {
    this.Webservice.Postget(0, this.start + 5).subscribe(res => {
      this.postArrayList = res.data.post;

    })
  }
  setFocus(event) {
  }
  ngOnInit() {
    this.userId = this.Webservice.getUser;
    this.postGet();
    this.showUpdate = false;
  }
  	/**
	 * sharePost method is used to share the post of other users.
	 * @param {post} type    json type
	 * 
	 */
  sharePost(post) {
    let postJson = {
      postText: post.postText,
      postAccessTypeId: post.postAccessTypeId,
      postById: post.postById,
      date: new Date()
    };
    this.Webservice.postShare(postJson).subscribe(res => {
      this.elyNotificationService.showNotification({type:CommonConstants.SUCCESS,message:res.message});
     // this.Webservice.alertDialog(res.message, '/home')
      this.postGetList();

    })
  }
	/**
	 * unlike or unlike the post.
	 *
	 * @param {post} type    json type
	 */
  postLike(post) {
    let postLikeJson = {
      "likeTypeId": "1",
      "postId": post.postId,
      "cmntId": "",
      "replyId": "",
      "likeText": "",
      "createdDate": new Date(),
      "updatedDate": new Date()
    }
    this.Webservice.postLike(postLikeJson).subscribe(res => {
      this.elyNotificationService.showNotification({type:CommonConstants.INFO,message:res.message});
      //this.Webservice.alertDialog(res.message, '/home')
      this.postGetList();
    });
  }

	/**
	 * Hide or delete the post.
	 *
	 * @param {post id} type    json type
	 * @param {action - delete or hide} message string message
	 */
  hidePost(post, deleteHide){
    
      this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
        disableClose: false
    });
    if(deleteHide===CommonConstants.DELETE){
      this.confirmDialogRef.componentInstance.headerMsg=CommonConstants.DELETE_POST_HEADER_MSG;
      this.confirmDialogRef.componentInstance.confirmMessage = CommonConstants.DELETE_POST;
    }else if(deleteHide===CommonConstants.HIDE){
      this.confirmDialogRef.componentInstance.headerMsg=CommonConstants.HIDE_POST_HEADER_MSG;
      this.confirmDialogRef.componentInstance.confirmMessage =  CommonConstants.HIDE_POST;
    }
    this.confirmDialogRef.afterClosed().subscribe(result => {
        if ( result ) {
          let data={
            postId:post.postId,
            deleteHide:deleteHide
          }
          this.Webservice.hideDeletePost(data).subscribe(res => {
            this.elyNotificationService.showNotification({type:CommonConstants.WARNING,message:res.message});
           // this.Webservice.alertDialog(res.message, '/home')
            this.postGetList();
          });
        }
        this.confirmDialogRef = null;
    });
  
  
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

      this.showUpdate = false;
      this.postGet();
      this.registerForm = this.formBuilder.group({
        title: ['', Validators.required],
        text: ['', Validators.required]

      });

    });
  }

  //post comment
  postComment() {
    let data = {
      postText: this.PostData,
      postAccessTypeId: '1',
      date: new Date()
    }
    this.Webservice.Postsend(data).subscribe(res => {
      //this.Webservice.alertDialog(res.message, '/home')
      this.elyNotificationService.showNotification({type:CommonConstants.SUCCESS,message:res.message});
      this.start = this.start + 1;
      this.postGetList();
    })
  }
  postCommentSend(data) {
    if (this.cmtForm.value.commentText) {

    } else { return false; }
    let data1 = {
      commentText: this.cmtForm.value.commentText,
      date: new Date(),
      postId: data.postId, noOfLike: '0'
    }
    this.Webservice.Postcmtsend(data1).subscribe(res => {
      this.elyNotificationService.showNotification({type:CommonConstants.SUCCESS,message:res.message});
      //this.Webservice.alertDialog(res.message, '/home')
      this.postGetList();
      this.cmtForm.reset();
    })
  }
  reply(data) {
    let data2 = {
      replyText: this.replycmtForm.value.replyText,
      date: new Date(),
      cmntId: data.commentId
    }
    this.Webservice.Postcmtreplysend(data2).subscribe(res => {
      this.elyNotificationService.showNotification({type:CommonConstants.SUCCESS,message:res.message});
      //this.Webservice.alertDialog(res.message, '/home')
      this.replycmtForm.reset();
      this.postGetList();
    })
  }
  scrolldata(data) {

    if (this.start == 1) {
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
