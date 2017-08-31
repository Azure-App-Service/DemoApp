import { Component, Input, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {Constants} from '../util/constants';
import {ChatService } from "../services/chat.service";
import {Cookie} from "../util/cookieHelper";
import {MessageNotification} from "../shared/messageNotification";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['../shared/shared.css', './header.component.css' ]
})

export class HeaderComponent implements OnInit {
    title:string = "Developer Finder";
    banner:string = "We are going global!";

    titleTop:string = this.title;
    titleBottom:string = "The marketplace for your next application team";

    learnMoreUr:string = "";

    logoutDefault:string = Constants.logoutArgs.default;
    logoutUrl:string = Constants.logoutArgs.logout;
    logoutClearUrl:string = Constants.logoutArgs.clear;

    notifications:MessageNotification[] = new Array<MessageNotification>();
    isNotificationVisible:Boolean = false;
    notificationsSummaryCount:number = 0;

    @Input('isLoginPage') isLoginPage:Boolean;
    constructor(private chatService:ChatService,private router: Router){
    }

    ngOnInit() {
        setInterval(()=> {this.tryReceiveMessageNotifications()},Constants.chatRequestInterval);
    }

    tryReceiveMessageNotifications(){
        this.chatService
            .getMessageNotifications()
            .subscribe(resp=> {
                   this.notifications = resp;
                   console.log(this.notifications);
                   if(this.notifications.length==0)
                        return;
                   this.notificationsSummaryCount = this.notifications
                                                        .map(n => n.messageCount!=null?n.messageCount:0)
                                                        .reduce((sum, current) => sum + current);
            },
                error => console.log(`onError: ${error}`),
            );
    }

    showOrHideNotification($event){
        if ($event.currentTarget === $event.target) {
            console.log('Clicked the parent, not the child.');
            if(this.notifications.length == 0)
                return;
            this.isNotificationVisible = !this.isNotificationVisible;
        }
    }

    hideNotification(){
        this.isNotificationVisible = false;
    }

    goChat(chatUserId){
        this.router.navigate(['chat',chatUserId,Constants.fromUnreadToChat]);
    }

    logout(logoutArgs){
        if(logoutArgs==this.logoutDefault)
            return;
        if(logoutArgs == this.logoutClearUrl)
            Cookie.deleteAll();
        location.href = logoutArgs;
    }

    goHome(){
        location.href = "/";
    }

}