import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

/*
  Generated class for the YourCoffeeWebServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class YourCoffeeWebServiceProvider {

  // yourCoffeeUrl : string = "http://www.terraquimbaya.com/api"; // for building app

  yourCoffeeUrl : string = "/api"; // for browser testing

  data: any;
  productInfo: any;
  searchData: any;
  _userToken: any = null;
  _user: any = null;


  constructor(public http: Http, public storage: Storage) {
    console.log('Hello YourCoffeeWebServiceProvider Provider');
    storage.get("user-token").then((token) => {
      this._userToken = token;
      // console.log(this._userToken);
    },
    (err) => {
      this._userToken = null;
      // console.log(this._userToken);
    });
    storage.get('user-detail').then((user) => {
      this._user = user;
      // console.log(this._user);
    },
    (err) => {
      this._user = null;
      // console.log(this._user);
    });
  }

  handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(error.json());
  }
// : Observable<YourCoffeeWebServiceProvider[]>
  load(page?: any) {
  	let headers = new Headers({'Accept': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    if (page) {
      let p = new URLSearchParams();
      for (let k in page) {
        p.set(k, page[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.params = !options.params && p || options.params;
    }

   	return  this.http.get(this.yourCoffeeUrl + "/home", options)
            // .do((res : Response ) => console.log(res.json()))
            .map((res : Response ) => res.json())//.catch(this.handleError);;
            .catch(this.handleError);
  }

    // load() {
    //   let headers = new Headers({'Accept': 'application/json'});
    //   let options = new RequestOptions({ headers: headers });

    //   if (this.data) {
    //     return Promise.resolve(this.data);
    //   }
    //   // Dont have the data yet
    //   return new Promise(resolve => {
    //     this.http.get(this.yourCoffeeUrl + "/api/home", options)
    //       .map(res => res.json())
    //       .subscribe(data => {
    //         this.data = data;
    //         resolve(this.data);
    //       });
    //   });
    // }

  product(id, params?: any) {
    let headers = new Headers({'Accept': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.params = !options.params && p || options.params;
    }

    return this.http.get(this.yourCoffeeUrl + "/product/" + id, options)
          // .do((res : Response ) => console.log(res.json()))
          .map((res : Response ) => res.json())
          .catch(this.handleError);
  }

  provider(id, product_page?: any) {
      let headers = new Headers({'Accept': 'application/json'});
      let options = new RequestOptions({ headers: headers });

      if (product_page) {
        let p = new URLSearchParams();
        for (let k in product_page) {
          p.set(k, product_page[k]);
        }
        // Set the search field if we have params and don't already have
        // a search field set in options.
        options.params = !options.params && p || options.params;
      }

      return this.http.get(this.yourCoffeeUrl + "/provider/" + id, options)
          // .do((res : Response ) => console.log(res.json()))
          .map((res : Response ) => res.json())
          .catch(this.handleError);
  }

    // product(id) {
    //   let headers = new Headers({'Accept': 'application/json'});
    //   let options = new RequestOptions({ headers: headers });

    //   if (this.productInfo) {
    //     return Promise.resolve(this.productInfo);
    //   }

    //   return new Promise(resolve => {
    //     this.http.get(this.yourCoffeeUrl + "/api/product/" + id, options)
    //       .map((res : Response ) => res.json())
    //       .subscribe(data => {
    //         this.productInfo = data;
    //         resolve(this.productInfo);
    //       });
    //   });
    // }

  search(name) {
    let headers = new Headers({'Accept': 'application/json'});
    let myParams = new URLSearchParams();
    myParams.append('keyword', name);

    let options = new RequestOptions({ headers: headers, params: myParams });

    return this.http.get(this.yourCoffeeUrl + "/search", options)
          // .do((res : Response ) => console.log(res.json()))
          .map((res : Response ) => res.json())
          .catch(this.handleError);
  }

    // search(name) {
    //   let headers = new Headers({'Accept': 'application/json'});
    //   let myParams = new URLSearchParams();
    //   myParams.append('keyword', name);

    //   let options = new RequestOptions({ headers: headers, params: myParams });

    //   if (this.searchData) {
    //     return Promise.resolve(this.searchData);
    //   }

    //   return new Promise(resolve => {
    //     this.http.get(this.yourCoffeeUrl + "/api/search", options)
    //       .map((res : Response ) => res.json())
    //       .subscribe(data => {
    //         this.searchData = data;
    //         resolve(this.searchData);
    //       });
    //   });
    // }

    // handleError(error) {
    //   console.error(error);
    //   // return Observable.throw(error.json().error || 'Server error');
    // }


  getRegister() {
    let headers = new Headers({'Accept': 'application/json'});
    let options = new RequestOptions({ headers: headers });

     return  this.http.get(this.yourCoffeeUrl + "/register", options)
            // .do((res : Response ) => console.log(res.json()))
            .map((res : Response ) => res.json())//.catch(this.handleError);;
            .catch(this.handleError);
  }

  login(credentials) {
    let headers = new Headers({'Accept': 'application/json', 'Content-Type': 'application/json'});

    // if (this._userToken) {
    //   return Promise.resolve({'status': 'success', 'token': this._userToken,'message': ''});
    // }
    // let body = new URLSearchParams();
    // body.append('email', credentials.email);
    // body.append('password', credentials.password);
    // let body = credentials;
    let options = new RequestOptions({ headers: headers });

    // return new Promise ((resolve, reject) => {
    //   this.http.post(this.yourCoffeeUrl + "/login", credentials, options)
    //     // .do((res : Response ) => console.log(res.json()))
    //     .map((res : Response ) => res.json())
    //     .subscribe(data => {
    //       this._userToken = data.token;
    //       this.storage.set('user-token', this._userToken)
    //       resolve(data);
    //     },
    //     (err) => {
    //       reject(err);
    //     });
    //     // .catch(this.handleError);
    // });
    return this.http.post(this.yourCoffeeUrl + "/login", credentials, options)
            // .do((res : Response ) => console.log(res.json()))
            .map((res : Response ) => res.json())//.catch(this.handleError);;
            .catch(this.handleError);
  }

  getToken() {
    return this._userToken;
  }

  setToken(token) {
    this._userToken = token;
    this.storage.set('user-token', this._userToken);

    this._user = null;
    this.storage.set('user-detail', null);
  }

  user(token, reload:boolean = false) {

    if (this._user && !reload) {
      return Promise.resolve({'status': 'success', 'data': this._user});
    }

    let headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    });

    let options = new RequestOptions({ headers: headers });

    return new Promise ((resolve, reject) => {
      this.http.get(this.yourCoffeeUrl + '/user', options)
        .map((res: Response) => res.json())
        .subscribe(data => {
          this._user = data.data;
          this.storage.set('user-detail', this._user)
          resolve(data);
        },
        (err) => {
          reject(err);
        });
        // .catch(this.handleError);
    });
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  register(userData) {
    let headers = new Headers({'Accept': 'application/json', 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.yourCoffeeUrl + "/register", userData, options)
      // .do((res : Response ) => console.log(res.json()))
      .map((res : Response ) => res.json())//.catch(this.handleError);;
      .catch(this.handleError);
  }

  removeCredentials() {
    this._userToken = null;
    this.storage.remove('user-token');
    this.storage.remove('user-detail');
    this._user = null;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout(do_call:boolean = true) {

    let headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._userToken,
    });

    let options = new RequestOptions({ headers: headers });

    return new Promise ((resolve, reject) => {
        if(do_call) {
          this.http.get(this.yourCoffeeUrl + '/logout', options)
            .map((res : Response ) => res.json())
            .catch(this.handleError)
            .subscribe(res => {
              this.removeCredentials();
              resolve(res);
            },
            (err) => {
              this._userToken = null;
              this.storage.remove('user-token');
              this.storage.remove('user-detail');
              this._user = null;
              reject(err);
            }
          );
        } else {
          this.removeCredentials();
          resolve({'status': 'success', 'message': 'User logged out'});
        }
      }
    );
  }

  userUpdate(user, data) {
    let headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._userToken,
    });

    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.yourCoffeeUrl + "/user/" + user, data, options)
      // .do((res : Response ) => console.log(res.json()))
      .map((res : Response ) => res.json())//.catch(this.handleError);;
      .catch(this.handleError);
  }

  delete(user_id) {
    let headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._userToken,
    });

    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`${this.yourCoffeeUrl}/user/${user_id}`, options)
    .map((res: Response) => res.json())
    .catch(this.handleError);
  }

  country() {
    let headers = new Headers({'Accept': 'application/json'});
    let options = new RequestOptions({ headers: headers });

     return  this.http.get(this.yourCoffeeUrl + "/country", options)
            // .do((res : Response ) => console.log(res.json()))
            .map((res : Response ) => res.json())//.catch(this.handleError);;
            .catch(this.handleError);
  }

  departments(country) {
    let headers = new Headers({'Accept': 'application/json'});
    let options = new RequestOptions({ headers: headers });

     return  this.http.get(this.yourCoffeeUrl + "/departments/" + country, options)
            // .do((res : Response ) => console.log(res.json()))
            .map((res : Response ) => res.json())//.catch(this.handleError);;
            .catch(this.handleError);
  }

  cities(department) {
    let headers = new Headers({'Accept': 'application/json'});
    let options = new RequestOptions({ headers: headers });

     return  this.http.get(this.yourCoffeeUrl + "/cities/" + department, options)
            // .do((res : Response ) => console.log(res.json()))
            .map((res : Response ) => res.json())//.catch(this.handleError);;
            .catch(this.handleError);
  }
}
