import {Component, OnInit,Inject } from '@angular/core';
import { Router} from '@angular/router';

import {Profile} from '../shared/profile';
import {Friend} from '../shared/friend';
import {ConnectedAccount} from '../shared/connectedAccount';
import { ProfileService } from '../services/profile.service';
import { FriendService } from '../services/friend.service';
import { ConnectService } from '../services/connect.service';
import { AuthHelper } from "../util/authHelper";
import { UrlHelper } from '../util/urlHelper';
import { Constants } from '../util/constants';
import { CommonUtil } from "../util/commonUtil";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: [ './profile.component.css','../shared/shared.css' ]
})
export class ProfileComponent implements OnInit {
  
  isEditMode:Boolean = false;
  profileId?:number;
  hasAccountNotConnected:Boolean = false;
  isValidated:Boolean = true;
  currentProfile:Profile = new Profile();
  isAlreadyFriend:Boolean = false;
  disableAddFriendAndChatId = Constants.seedFriendIdBegin;
  disableAddFriendTip = '';
  constructor(private profileService: ProfileService,
              private connectService:ConnectService,
              private friendService: FriendService,
              private router: Router,
              @Inject('auth') private auth: AuthHelper) { }

  ngOnInit(): void {
    if(!this.auth.isLogin()){
      this.auth.reLogin();
    }
    this.checkIsEditMode();
    if(this.isEditMode){
      this.profileService.getCurrentUserProfile()
                         .subscribe(profile=>{
                           this.currentProfile = profile;
                           this.tryParsePosition();
                           this.checkConnectedAccounts();
                         });
    }else{
      this.profileService.getUserProfile(this.profileId)
                         .subscribe(profile=>{
                           this.currentProfile = profile;
                           this.tryParsePosition();
                           this.friendService.getFriends()
                                             .subscribe(
                                               (friends)=>{
                                                 friends.forEach(f=>{
                                                   if(f.friendProfile.id == this.currentProfile.id)
                                                      this.isAlreadyFriend = true;
                                                 })
                                               }
                                             );
                         });
    }
  }

  checkConnectedAccounts(){
    this.connectService.getConnectedAccounts()
                       .subscribe((resp)=>{
                            var socialProviderArray = resp as ConnectedAccount[];
                            if(socialProviderArray.length<2) //not two accounts connected
                              this.hasAccountNotConnected = true;
                        });
  }

  

  tryParsePosition():void{
       this.currentProfile.position = this.profileService.getProfilePosition(this.currentProfile);
  }
  

  doChat(id:string):void{
    if(parseInt(id) >= this.disableAddFriendAndChatId){
      this.disableAddFriendTip = Constants.disableAddFriendAndChatTip;
      return;
    }
    id && this.router.navigate(['chat',id]);
  }

  saveProfile():void{
    this.checkPhoneNumber(this.currentProfile.phone_number);
    if(!this.isValidated)
      return;
    this.profileService.updateCurrentUserProfile(this.currentProfile)
                       .subscribe(
                         resp=>{location.reload();},
                         error=>{console.log(error);}
                       );
  }

  checkPhoneNumber(newValue) {
    if(newValue)
      this.isValidated = true;
    else
      this.isValidated = false;
  }

  goTo(url:string):void{
    this.router.navigate([url]);
  }

  addFriend(friendId:string):void{
    if(!friendId)
      return;
     if(parseInt(friendId) >= this.disableAddFriendAndChatId){
       this.disableAddFriendTip = Constants.disableAddFriendAndChatTip;
       return;
    }
    this.friendService
        .addFriend(friendId)
        .subscribe(
          (resp)=>{
              if(resp==false)
                return;
              this.isAlreadyFriend = true;
          }
        );
   }

  private checkIsEditMode():void{
    this.profileId = UrlHelper.getQueryId();
    if(isNaN(this.profileId) || this.profileId<0){
      this.isEditMode = true;
    }else{
      this.isEditMode = false;
    }
  }

}
