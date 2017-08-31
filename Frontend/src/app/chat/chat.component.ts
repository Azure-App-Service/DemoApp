import { Component, OnInit,Inject } from '@angular/core';
import { Router} from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Constants } from '../util/constants';
import { AuthHelper } from "../util/authHelper";
import { UrlHelper } from "../util/urlHelper";
import { CommonUtil } from "../util/commonUtil";
import {ChatService } from "../services/chat.service";
import {ChatMessage} from "../shared/message";
import {ProfileService } from "../services/profile.service";
import {Profile} from "../shared/profile";

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['../shared/shared.css', './chat.component.css' ]
})
export class ChatComponent implements OnInit {

  existedMessages:ChatMessage[] = new Array<ChatMessage>();
  friendProfile:Profile;
  currentUserProfile:Profile;

  msgContent:string = '';
  btnDisabled:Boolean = false;
  isPageFromNotification:Boolean = true;

  self:ChatComponent;
  constructor(private chatService: ChatService,
              private router: Router,
              private profileService:ProfileService,
              @Inject('auth') private auth: AuthHelper) {}
 
  ngOnInit(): void {
    if(!this.auth.isLogin()){
      this.auth.reLogin();
    }
    this.isPageFromNotification = this.checkFromSource();
    this.initProfiles(UrlHelper.getQueryId(),this.getReceivedMessages);
  }

  checkFromSource(){
    let chatFrom = UrlHelper.getQueryFrom();
    console.log(chatFrom);
    return chatFrom == Constants.fromUnreadToChat;
  }

  trySendSMS(){
      if(this.isPageFromNotification)
        return;
      let sendMsgs = this.existedMessages.filter(message=>message.ownByMe);
      if(sendMsgs.length>1)
        return;
      //console.log('begin send sms');
      this.chatService.sendSMS(this.friendProfile.phone_number,sendMsgs[0].content);
  }

  initProfiles(friendId:number,callBack){
    Observable.forkJoin(
                [
                  this.profileService.getCurrentUserProfile().first(),
                  this.profileService.getUserProfile(friendId).first()
                ]
              ).subscribe(
                 results => {
                    this.friendProfile = results[1];
                    this.currentUserProfile = results[0];
                    if(callBack){
                        setInterval(()=> {this.getReceivedMessages(this)},Constants.chatRequestInterval);
                    }
                },
                error => console.log(`onError: ${error}`),
    );
  }


  getReceivedMessages(chatComponent):void{
    chatComponent.chatService
                 .getLatestMessages(chatComponent.friendProfile.id.toString(),chatComponent.friendProfile)
                 .subscribe(
                   result=>{
                     chatComponent.existedMessages = chatComponent.existedMessages.concat(result);
                   },
                   error => console.log(`onError: ${error}`),
                 );
  }

  sendMessage(){
    this.btnDisabled = true;
     this.chatService
         .sendMessage(this.friendProfile.id.toString(),this.msgContent,this.currentUserProfile)
         .subscribe(
             msg=>{
                this.btnDisabled = false;
                this.existedMessages.push(msg);
                this.msgContent = '';
                this.trySendSMS();
             },
             error => {
                console.log(`onError: ${error}`);
                this.btnDisabled = false;
             }
         );
  }

  viewProfile(id:string):void{
    if(id)
      this.router.navigate(['profile',id]);
  }

}