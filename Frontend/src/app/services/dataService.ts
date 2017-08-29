/*
* Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
* See LICENSE in the project root for license information.
*/

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { AuthHelper } from "../util/authHelper";

@Injectable()
export class DataService {

    constructor(
        private _http: Http,
        @Inject('auth') private authService: AuthHelper) {
    }

    getHeader(token: string) {
        let header = new Headers();
        header.append('Authorization', 'Bearer ' + token);
        return header;
    }

    getHeaderWithoutToken() {
        let header = new Headers();
        return header;
    }

    getRandomTick(url){
        let result = '';
        if(url.indexOf('?')<0)
            result += '?';
        else
            result += '&';
        result += ('t=' + new Date().getTime());
        return result;
    }

    public get(actionUrl: string) {
        let activeProject: ReplaySubject<any> = new ReplaySubject(1);
        this._http.get(actionUrl + this.getRandomTick(actionUrl), { headers: this.getHeaderWithoutToken() })
                    .subscribe((data) => {
                        activeProject.next(data);
                    },
                    (error) => {
                        activeProject.error(error);
                    });
        return activeProject;
    }

    public getObject<T>(actionUrl: string): Observable<T> {
        let activeProject: ReplaySubject<any> = new ReplaySubject(1);
        this._http.get(actionUrl+this.getRandomTick(actionUrl), { headers: this.getHeaderWithoutToken() })
                    .subscribe(
                    (data)=>{
                        activeProject.next(<T>data.json());
                    },
                    (error)=>{
                        activeProject.error(error);
                    });
        return activeProject;
    }
    

    public getArray<T>(actionUrl: string): Observable<T[]> {
        return this.getObject<any>(actionUrl)
            .map(data => {
                return <T[]>data;
            });
    }

    public post(actionUrl: string, data: any) {
        let activeProject: ReplaySubject<any> = new ReplaySubject(1);
        this._http.post(actionUrl, data, { headers: this.getHeaderWithoutToken() })
                         .subscribe(
                            (data)=>activeProject.next(data.json()),
                            (error)=>activeProject.error(error)
                         );
        return activeProject;
    }

    public getWithoutToken(actionUrl: string) {
        return this._http.get(actionUrl);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
}