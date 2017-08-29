import { Component, OnInit,Inject } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Constants } from '../util/constants';
import { AuthHelper } from "../util/authHelper";
import { LoginService } from '../services/login.service';
import { ConnectService } from '../services/connect.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['../shared/shared.css' ,'./login.component.css']
})
export class LoginComponent implements OnInit {
   gitHubLoginUrl:string;
   linkedInLoginUrl:string;
  constructor(private loginService: LoginService,
              private connectService: ConnectService,
              @Inject('auth') private auth: AuthHelper) { }
 
  ngOnInit(): void {
    if(!this.auth.isLogin()){
      this.auth.reLogin();
    }
    this.gitHubLoginUrl = Constants.LoginUrl;
    this.linkedInLoginUrl = Constants.ConnectLinkedInUrl;
  }
}