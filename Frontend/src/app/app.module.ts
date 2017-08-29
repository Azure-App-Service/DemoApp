import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }             from './app.component';
import { AuthHelper }               from "./util/authHelper";
import { DataService}               from "./services/dataService";
import { LoginService }             from './services/login.service';
import { LoginComponent }           from './login/login.component';
import { FriendService }            from './services/friend.service';
import { ProfileService }           from './services/profile.service';
import { ConnectService }           from './services/connect.service';
import { SMSService }               from './services/sms.service';
import { ChatService }              from './services/chat.service';
import { ProfileComponent }         from './profile/profile.component';
import { ConnectSocialComponent }   from './connect/connectSocial.component';
import { SearchComponent }          from './search/search.component';
import {HeaderComponent  }          from './header/header.component';
import {ChatComponent  }            from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    ConnectSocialComponent,
    SearchComponent,
    HeaderComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    { provide: 'auth', useClass: AuthHelper },
    { provide: 'data', useClass: DataService },
    LoginService,
    FriendService,
    ProfileService,
    ConnectService,
    SMSService,
    ChatService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
