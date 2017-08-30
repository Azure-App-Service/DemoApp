import { Component, OnInit,Inject } from '@angular/core';
import { Router} from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { Cookie } from './util/cookieHelper';
import { Constants } from './util/constants';
import { ConnectService } from './services/connect.service';
import { ProfileService } from './services/profile.service';
import {ConnectedAccount} from './shared/connectedAccount';
import {Profile} from './shared/profile';
import { CommonUtil } from "./util/commonUtil";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private router: Router,
    private connectService: ConnectService,
    private profileService: ProfileService,
  ){}

  ngOnInit(): void {
    if(location.pathname=='/' || location.pathname.indexOf('done')>=0)
        this.checkUserAuthorization();
  }  

  hasGitHubConnected:Boolean = false;
  hasLinkedInConnected:Boolean = false;
  currentUserProfile:Profile;

  checkUserAuthorization(){
     let authenticated = Cookie.get(Constants.AuthKey);
     if(authenticated!='true'){
       this.router.navigate(['login']);
       return;
     }

    let connectAccessed= Cookie.get(Constants.ConnectKey);
    if(connectAccessed!='true'){
      this.router.navigate(['connect',1]);
      return;
    }
    this.connectService.getConnectedAccounts()
        .subscribe(accounts=>{
            this.profileService.getCurrentUserProfile()
                .subscribe(profile=>{
                      accounts.forEach(connected=>{
                          if(CommonUtil.isIgnoreCaseEqual(connected.provider,Constants.SocialProvider.GitHub))
                            this.hasGitHubConnected = true;
                          this.currentUserProfile = profile;
                          if(this.hasGitHubConnected){
                            if(this.currentUserProfile.phone_number && this.currentUserProfile.skills){
                                if(location.pathname=='/')
                                  this.router.navigate(['search']);
                            }else{
                                this.router.navigate(['profile']);
                            }
                          }else{
                            if(this.currentUserProfile.phone_number){
                               if(location.pathname=='/')
                                this.router.navigate(['search']);
                            }else{
                                this.router.navigate(['profile']);
                            }
                          }
                      });
                });
        });
  }

  componentAdded(component){
   
  }

}
