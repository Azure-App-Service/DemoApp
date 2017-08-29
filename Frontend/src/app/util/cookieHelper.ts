/*
* Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
* See LICENSE in the project root for license information.
*/

/**
 * Class Cookie - Holds static functions to deal with Cookies
 */
import { Constants } from '../util/constants';

export class Cookie {

	/**
	 * Checks the existence of a single cookie by it's name
	 */
    public static check(name: string): boolean {
        name = encodeURIComponent(name);
        let regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
        let exists = regexp.test(document.cookie);
        return exists;
    }

	/**
	 * Retrieves a single cookie by it's name
	 */
    public static get(name: string): string {
        if (Cookie.check(name)) {
            name = encodeURIComponent(name);
            let regexp = new RegExp('(?:^' + name + '|;\\s*' + name + ')=(.*?)(?:;|$)', 'g');
            let result = regexp.exec(document.cookie);
            return decodeURIComponent(result[1]);
        } else {
            return null;
        }
    }

	/**
	 * Retrieves all available cookies
	 */
    public static getAll(): any {
        let cookies: any = {};

        if (document.cookie && document.cookie != '') {
            let split = document.cookie.split(';');
            for (let i = 0; i < split.length; i++) {
                let currCookie = split[i].split('=');
                currCookie[0] = currCookie[0].replace(/^ /, '');
                cookies[decodeURIComponent(currCookie[0])] = decodeURIComponent(currCookie[1]);
            }
        }

        return cookies;
    }

	/**
	 * Save the Cookie
	 *
	 * @param  {string} name Cookie's identification
	 * @param  {string} value Cookie's value
	 * @param  {number} expires Cookie's expiration date in minutes from now or at a specific date from a Date object. If it's undefined the cookie is a session Cookie
	 * @param  {string} path Path relative to the domain. The default value is '/'
	 * @param  {string} domain The default value is current domain
	 * @param  {boolean} secure If true, the cookie will only be available through a secured connection
	 */
    public static set(name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean) {
        let cookieStr = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';

        if (expires) {
            if (typeof expires === 'number') {
                let dtExpires = new Date(new Date().getTime() + expires * 60 * 1000);
                cookieStr += 'expires=' + dtExpires.toUTCString() + ';';
            } else {
                cookieStr += 'expires=' + expires.toUTCString() + ';';
            }
        }

        if (path) {
            cookieStr += 'path=' + path + ';';
        }
        if (domain) {
            cookieStr += 'domain=' + domain + ';';
        }
        if (secure) {
            cookieStr += 'secure;';
        }

        document.cookie = cookieStr;
    }

	/**
	 * Removes specified Cookie
	 *
	 * @param  {string} name Cookie's identification
	 * @param  {string} path Path relative to the domain. The default value is '/'
	 * @param  {string} domain The default value is current domain
	 */
    public static delete(name: string, path?: string, domain?: string) {
        // If the cookie exists
        if (Cookie.get(name)) {
            Cookie.set(name, '', -1, path, domain);
        }
    }

	/**
	 * Delete all cookies
	 */
    public static deleteAll(path?: string, domain?: string): any {
        let cookies: any = Cookie.getAll();

        for (let cookieName in cookies) {
            Cookie.delete(cookieName, path, domain);
        }
    }
    
}