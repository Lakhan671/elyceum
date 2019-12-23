import { Component, OnInit ,HostListener} from '@angular/core';
import { FuseConfigService } from '../../../core/services/config.service';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../core/animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HomeService} from './homeWeService'
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations   : fuseAnimations
  
})
@HostListener('scroll', ['$event'])

export class HomeComponent implements OnInit {
  commentArayList:any;
  PostData:any;
  replyArrayList:any;
  postArrayList:any;
  LikeArrayList:any;
  showReply:any;
  registerForm: FormGroup;
  registerFormErrors: any;
  cmtForm: FormGroup;
   cmtFormErrors: any;
   replycmtForm: FormGroup;
   replycmtFormErrors: any;
start:number;
end:number;
  NewsList:any;
  showUpdate:boolean;
  showText:boolean;
  PostcmtSend:any;
  PostcmtreplySend:any;
  userName:any;
  continue:any;
  constructor(private translationLoader: FuseTranslationLoaderService,
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder,private Webservice: HomeService) {
      this.continue = true;
      this.postArrayList=[];
      this.start = 0;
      this.end = 5;
      this.userName = this.Webservice.getuserName; 
      this.showText = true;
      this.showReply = false;
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
this.cmtForm  = this.formBuilder.group({
  commentText           : [''],
 
});
this.replycmtForm  = this.formBuilder.group({
  replyText           : [''],
 
});
  }
  userId :any;
  newsCreate(){
     this.Webservice.NewsSave(this.registerForm.value).subscribe(res=>{
        
      this.postGet();
      this.registerForm = this.formBuilder.group({
        title           : ['', Validators.required],
        text           : ['', Validators.required] 
    
      });
    
     })
  }
  
  
  postGet(){
     this.Webservice.Postget(this.start,5).subscribe(res=>{
          if(res.data.post.length == 5){

         }else{
          this.continue = false;
         }
      this.scrolldata(res.data.post);
      })
  }
  postGetList(){
    this.Webservice.Postget(0,this.start +5).subscribe(res=>{ 
      this.postArrayList = res.data.post;

     })
 }
  setFocus(event){
   }
  ngOnInit() {
    this.userId = this.Webservice.getUser;
this.postGet();
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
          this.postGet();
          this.registerForm = this.formBuilder.group({
            title           : ['', Validators.required],
            text           : ['', Validators.required] 
        
          });

    });
  }

  //post comment
  postComment(){
     let data = {
      postText:this.PostData,
      postAccessTypeId:'1',
      date:new Date()
    }
     this.Webservice.Postsend(data).subscribe(res=>{
       this.Webservice.alertDialog(res.message,'/home')
       this.start = this.start +1;
       this.postGetList();

      })
  }
  postCommentSend(data){
     if(this.cmtForm.value.commentText){

    }else{return false;}
    let data1 = {
      commentText:this.cmtForm.value.commentText,
      date:new Date(),
      postId:data.postId,noOfLike:'0'
    }
 this.Webservice.Postcmtsend(data1).subscribe(res=>{
  this.Webservice.alertDialog(res.message,'/home')
  this.postGetList();

})
  }
  reply(data){
     let data2 = {
      replyText:this.replycmtForm.value.replyText,
      date:new Date(),
      cmntId:data.commentId 
    }
  this.Webservice.Postcmtreplysend(data2).subscribe(res=>{
  this.Webservice.alertDialog(res.message,'/home')
   
  this.postGetList();
})
  }
scrolldata(data){
   
 if(this.start == 1){
  this.postArrayList = data;


 }else{
   if(data.length > 0){
    for(var i =0 ;i< data.length;i++){
      this.postArrayList.push(data[i])

    }
   }
 }
  
  console.log(this.postArrayList)
}

  public handleScroll(event: any) { 
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      console.log(this.continue)
      if(this.continue){
        this.start = this.start+5;
         this.postGet()
  
      }
    }

  }

}
