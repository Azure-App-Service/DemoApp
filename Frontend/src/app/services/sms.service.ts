import { Injectable,Inject }    from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Constants } from '../util/constants';
import { DataService } from './dataService';



@Injectable()
export class SMSService {

  constructor(@Inject('data') private dataService: DataService) { }
  
  public sendSMS(message:string):Observable<Boolean>{
       let activeObject:ReplaySubject<Boolean> = new ReplaySubject(1);
       this.dataService.post(Constants.WebAPI.smsUrl,{msg:message})
                       .subscribe(
                        resp=>activeObject.next(resp),
                        error=>activeObject.error(error));
       return activeObject;
   }
  
}
