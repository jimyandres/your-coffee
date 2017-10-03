import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { YourCoffeeWebServiceProvider } from "../../providers/your-coffee-web-service/your-coffee-web-service";
/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  _user: any;

  constructor(public http: Http, public yourCoffeeService: YourCoffeeWebServiceProvider) {
    console.log('Hello UserProvider Provider');
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(credentials: any) {
    let req = this.yourCoffeeService.login(credentials);

    // req
    //     .subscribe(
    //       (res) => {
    //         if (res.status == 'success') {
    //           this._loggedIn(res);
    //         } else {

    //         }
    //       },
    //       (err) => {
    //         // console.log(err);
    //       }
    //     );

    return req;
    // let seq = this.api.post('login', accountInfo).share();

    // seq
    //   .map(res => res.json())
    //   .subscribe(res => {
    //     // If the API returned a successful response, mark the user as logged in
    //     if (res.status == 'success') {
    //       this._loggedIn(res);
    //     } else {
    //     }
    //   }, err => {
    //     console.error('ERROR', err);
    //   });

    // return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    // let seq = this.api.post('signup', accountInfo).share();

    // seq
    //   .map(res => res.json())
    //   .subscribe(res => {
    //     // If the API returned a successful response, mark the user as logged in
    //     if (res.status == 'success') {
    //       this._loggedIn(res);
    //     }
    //   }, err => {
    //     console.error('ERROR', err);
    //   });

    // return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    // this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.token;
    localStorage.setItem('token', resp.token);
  }

}
