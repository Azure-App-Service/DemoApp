/*
* Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
* See LICENSE in the project root for license information.
*/
import { Injectable, Inject } from "@angular/core";
import { Constants } from './constants';
import { Cookie } from '../util/cookieHelper';
import { Http, Headers, Response } from '@angular/http';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class AuthHelper {

    constructor(
        private router: Router,
        private _http: Http) {
    }

    public isLogin(): boolean {
        var token = Cookie.get(Constants.AuthKey);
        if(token==null || token == undefined)
            return false;
        return token.toLowerCase()=='true';
    }

    public reLogin() {
        Cookie.delete(Constants.AuthKey);
        this.dologin();
    }

    private dologin() {
        this.router.navigate(['login']);
    }
}