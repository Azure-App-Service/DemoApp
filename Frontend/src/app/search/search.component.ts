import { Component, OnInit,Inject } from '@angular/core';
import { Router} from '@angular/router';
import { AuthHelper } from "../util/authHelper";
import { UrlHelper} from "../util/urlHelper";
import { FriendService } from '../services/friend.service';
import { ProfileService } from '../services/profile.service';
import {SearchModel} from './searchModel';
import {Profile} from '../shared/profile';
import {Friend} from '../shared/friend';
import { Constants } from '../util/constants';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.css' ]
})
export class SearchComponent implements OnInit {
  
  suggestedFriends:Friend[] = new Array<Friend>();
  searchedFriends:Friend[] = new Array<Friend>();

  searchModel:SearchModel = new SearchModel();
  currentUserProfile:Profile;
  hasSearched:Boolean = false;
  hasCompleteSuggested = false;
  disableSearch:Boolean=true;
  disableAddFriendAndChatId = Constants.seedFriendIdBegin;
  disableFriendAndChatTip = "The user with id >= 10000 could not chat or add as friend";
  
  fromKey = "searched";

  ifShowSuggestSpinner:Boolean=false;
  ifShowSearchSpinner:Boolean=false;

  constructor(private friendService: FriendService,
              private router: Router,
              private profileService: ProfileService,
              @Inject('auth') private auth: AuthHelper) { }

  ngOnInit(): void {
    if(!this.auth.isLogin()){
      this.auth.reLogin();
    }
    this.getSuggestedFriends();
    this.initCurrentUser();
  }  

  initCurrentUser():void{
    this.profileService.getCurrentUserProfile()
                       .subscribe(
                          (profile)=>{
                            if(profile!=null && profile.id>0){
                                this.disableSearch = false;
                                this.currentUserProfile = profile;
                            }
                          }
                       );
  }

  getSuggestedFriends():void{
    this.ifShowSuggestSpinner = true;
    this.friendService.getSuggestedFriends()
                       .subscribe(
                          (resp)=>{
                            this.suggestedFriends = resp;
                            this.hasCompleteSuggested = true;
                            this.ifShowSuggestSpinner = false;
                          },
                          (error)=>{
                            console.log(error);
                            this.ifShowSuggestSpinner = false;
                          }
                       );
  }

  buildSearchParamUrl(){
    this.searchModel.hireable = '';
    if(this.searchModel.hireableYes)
      this.searchModel.hireable += (Constants.hireableSearch.yes + ',');
    if(this.searchModel.hireableNo)
      this.searchModel.hireable += (Constants.hireableSearch.no + ',');
    if(this.searchModel.hireableUnknown)
      this.searchModel.hireable += (Constants.hireableSearch.unknown+ ',');
    if(this.searchModel.hireable.length>1)
      this.searchModel.hireable = this.searchModel.hireable.substr(0,this.searchModel.hireable.length-1);
    let searchParamUrl = UrlHelper.combineUrlParam(this.searchModel,['hireableNo','hireableYes','hireableUnknown']);
    return searchParamUrl;
  }

  doSearch():void{
    this.hasSearched = true;
    this.ifShowSearchSpinner = true;
    this.friendService.searchFriend(this.buildSearchParamUrl(),this.currentUserProfile)
                       .subscribe(
                         (resp)=>{
                           this.searchedFriends = resp;
                           this.ifShowSearchSpinner = false;
                         },
                         (error)=>{
                           console.log(error);
                           this.ifShowSearchSpinner = false;
                         }
                       );
  }

  viewProfile(id:string):void{
    if(id)
      this.router.navigate(['profile',id]);
  }

  handleDisableAddFriendAndChat(id:string,from:string){
     let friends = (from == this.fromKey)?this.searchedFriends:this.suggestedFriends;
     friends.forEach(friend=>{
       if(friend.friendProfile.id.toString() == id){
         friend.disableAddFriendTip = Constants.disableAddFriendAndChatTip;
       }
     });
  }

  doChat(id:string,from:string):void{
    if(parseInt(id) >= this.disableAddFriendAndChatId){
      this.handleDisableAddFriendAndChat(id,from);
      return;
    }
    id && this.router.navigate(['chat',id]);
  }

  addFriend(friendId:string,from:string):void{
    if(!friendId)
       return;
     if(parseInt(friendId) >= this.disableAddFriendAndChatId){
       this.handleDisableAddFriendAndChat(friendId,from);
       return;
    }
    this.friendService
        .addFriend(friendId)
        .subscribe(
          (resp)=>{
              if(resp==false)
                return;
              let currentProfiles:Friend[] = (from == this.fromKey)?this.searchedFriends:this.suggestedFriends;
              currentProfiles.forEach(friend=>{
                  if(friend.friendProfile.id.toString() == friendId)
                    friend.isAlreadyFriend = true;
              });
          }
        );
   }
 
}