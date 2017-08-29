import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class LoginService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private loginUrl = 'api/login';  // URL to web api

  constructor(private http: Http) { }

  doLogin(): Promise<Boolean> {
    return Promise.resolve(true);
  }

  verifyToken():Boolean{
    return true;
  }



 
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

