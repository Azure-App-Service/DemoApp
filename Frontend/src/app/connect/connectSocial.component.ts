import { Component, OnInit,Inject  } from '@angular/core';
import { Router} from '@angular/router';
import { Constants } from '../util/constants';
import {ConnectedAccount} from '../shared/connectedAccount';
import { AuthHelper } from "../util/authHelper";
import { Cookie } from "../util/cookieHelper";
import { CommonUtil } from "../util/commonUtil";
import { ConnectService } from '../services/connect.service';
import { ProfileService } from '../services/profile.service';
import { Profile} from '../shared/profile';

@Component({
  selector: 'connect',
  templateUrl: './connectSocial.component.html',
  styleUrls: [ '../shared/shared.css','./connectSocial.component.css' ]
})
export class ConnectSocialComponent implements OnInit {

  connectLinkedinUrl = Constants.ConnectLinkedInUrl;
  connectGitHubUrl = Constants.LoginUrl;

  hasLinkedInConnected = false;
  hasGithubConnected = false;
  profile:Profile;
  constructor(private connectService: ConnectService,
              private profileService:ProfileService,
              private router: Router,
              @Inject('auth') private auth: AuthHelper){}
  ngOnInit(): void {
    if(!this.auth.isLogin()){
      this.auth.reLogin();
    }
    else{
      this.init();
    }
  }

  init(){
    Cookie.set(Constants.ConnectKey,true.toString());
    this.profileService.getCurrentUserProfile()
                       .subscribe(
                          profile=>{
                            this.profile = profile;
                            this.checkConnectedAccount();
                          }
                       );
  }

  checkConnectedAccount():void{
     this.connectService.getConnectedAccounts()
                        .subscribe((resp)=>{
                            var socialProviderArray = resp as ConnectedAccount[];
                            socialProviderArray.forEach(connected=>{
                              if(CommonUtil.isIgnoreCaseEqual(connected.provider,Constants.SocialProvider.GitHub))
                                this.hasGithubConnected = true;
                              if(CommonUtil.isIgnoreCaseEqual(connected.provider,Constants.SocialProvider.LinkedIn))
                                this.hasLinkedInConnected = true;
                              if(this.hasGithubConnected && this.hasLinkedInConnected){
                                    if(this.profile!=null && this.profile.phone_number && this.profile.skills)
                                      this.router.navigate(['search']);
                                    else
                                      this.router.navigate(['profile']);
                              }else{
                                  if(Cookie.get(Constants.SocialProvider.SkipSocialKey)){
                                    if(this.profile!=null && this.profile.phone_number && this.profile.skills)
                                      this.router.navigate(['search']);
                                    else
                                      this.router.navigate(['profile']);
                                  }
                              }
                            });
                        });
  }

  skipTo(){
    Cookie.set(Constants.SocialProvider.SkipSocialKey,true.toString());
    this.router.navigate(['profile']);
  }

}
