import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }  from './login/login.component';
import { ProfileComponent }  from './profile/profile.component';
import { ConnectSocialComponent }  from './connect//connectSocial.component';
import { SearchComponent }  from './search/search.component';
import { ChatComponent }  from './chat/chat.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'done', redirectTo: '', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'profile',  component: ProfileComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'connect',  component: ConnectSocialComponent },
  { path: 'connect/:redirect',  component: ConnectSocialComponent },
  { path: 'search',  component: SearchComponent },
  { path: 'chat/:id',  component: ChatComponent },
  { path: 'chat/:id/:source',  component: ChatComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}