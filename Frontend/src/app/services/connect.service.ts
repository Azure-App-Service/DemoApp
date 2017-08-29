import { Injectable,Inject }    from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Constants } from '../util/constants';
import { DataService } from './dataService';
import {ConnectedAccount} from '../shared/connectedAccount'

@Injectable()
export class ConnectService {

  constructor(@Inject('data') private dataService: DataService) { }

  public getConnectedAccounts(): Observable<ConnectedAccount[]> {
      let activeObject: ReplaySubject<ConnectedAccount> = new ReplaySubject(1);
      this.dataService.getObject<string[]>(Constants.WebAPI.connectedAccountUrl)
                  .subscribe((resp) => {
                        var result = (resp as string[]).map(data=>{
                            return ConnectedAccount.Create(data);
                        });
                        activeObject.next(result);
                    },
                    (error) => {
                        activeObject.error(error);
                    });
      return activeObject;
   } 

}

