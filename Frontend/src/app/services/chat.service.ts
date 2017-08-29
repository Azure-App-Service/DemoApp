import { Injectable,Inject }    from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Constants } from '../util/constants';
import { DataService } from './dataService';
import { ChatMessage} from '../shared/message';
import { Profile} from '../shared/profile';
import { MessageNotification} from '../shared/messageNotification';
import { CommonUtil} from '../util/commonUtil';



@Injectable()
export class ChatService {

  constructor(@Inject('data') private dataService: DataService) { }

  public getLatestMessages(friendId:string,friendProfile:Profile):Observable<ChatMessage[]>{
      let activeObject:ReplaySubject<ChatMessage[]> = new ReplaySubject(1);
      this.dataService.getArray<ChatMessage>(Constants.WebAPI.chatMessageUrl + "/" +friendId)
                      .subscribe((resp)=>{
                          let result:ChatMessage[] = [];
                          resp.forEach(function(msg,index){
                                let message:ChatMessage = this.createChatMessage(friendProfile,false,msg);
                                result.push(message);
                          },this);
                          activeObject.next(result);
                      },
                      (error)=>{activeObject.error(error)});
      return activeObject;
   } 

   public sendMessage(friendId:string, content:string,currentUserProfile:Profile):Observable<ChatMessage>{
      let activeObject:ReplaySubject<ChatMessage> = new ReplaySubject(1);
      this.dataService.post(Constants.WebAPI.chatMessageUrl,{content:content,to:friendId})
                      .subscribe((resp)=>{
                            let msg = this.createChatMessage(currentUserProfile,true,resp);
                            activeObject.next(msg);
                      },
                      (error)=>{
                          activeObject.error(error);
                      });
      return activeObject;
   }

   private createChatMessage(profile:Profile,ownByMe:Boolean,msg):ChatMessage{
        let message:ChatMessage = new ChatMessage();
        message.content = msg.content;
        message.ownByMe = ownByMe;
        message.profile = profile;
        message.created = CommonUtil.formatDate(new Date(msg.created));
        return message;
   }

   public getMessageNotifications():Observable<MessageNotification[]>{
        let activeObject:ReplaySubject<MessageNotification[]> = new ReplaySubject(1);
        this.dataService.getArray<MessageNotification>(Constants.WebAPI.messageSummaryUrl)
                      .subscribe((resp)=>{
                          activeObject.next(resp);
                      },
                      (error)=>{activeObject.error(error)});
        return activeObject;
   }

   public sendSMS(toUserPhone:string,content:string):Observable<Boolean>{
        let activeObject:ReplaySubject<Boolean> = new ReplaySubject(1);
        this.dataService.post(Constants.WebAPI.chatSMSUrl,{message:content,to:toUserPhone})
                      .subscribe((resp)=>{
                          console.log(resp);
                          activeObject.next(resp);
                      },
                      (error)=>{activeObject.error(error)});
        return activeObject;
   }
  
}