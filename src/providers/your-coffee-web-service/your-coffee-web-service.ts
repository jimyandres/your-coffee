import { Injectable } from '@angular/core';
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

  // yourCoffeeUrl : string = "http://yourcoffee.us-west-2.elasticbeanstalk.com"; // for building app

  yourCoffeeUrl : string = "/api"; // for browser testing

  data: any;
  productInfo: any;
  searchData: any;


  constructor(public http: Http) {
    console.log('Hello YourCoffeeWebServiceProvider Provider');
  }

  private handleError (error: Response | any) {
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
  load() {
  	let headers = new Headers({'Accept': 'application/json'});
    let options = new RequestOptions({ headers: headers });

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

  product(id) {
    let headers = new Headers({'Accept': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.yourCoffeeUrl + "/product/" + id, options)
          // .do((res : Response ) => console.log(res.json()))
          .map((res : Response ) => res.json())
          .catch(this.handleError);
  }

  provider(id) {
      let headers = new Headers({'Accept': 'application/json'});
      let options = new RequestOptions({ headers: headers });

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

  login(credentials) {
    let headers = new Headers({'Accept': 'application/json', 'Content-Type': 'application/json'});
    // let body = new URLSearchParams();
    // body.append('email', credentials.email);
    // body.append('password', credentials.password);
    // let body = credentials;
    let options = new RequestOptions({ headers: headers });

    return  this.http.post(this.yourCoffeeUrl + "/login", credentials, options)
            // .do((res : Response ) => console.log(res.json()))
            .map((res : Response ) => res.json())//.catch(this.handleError);;
            .catch(this.handleError);
  }
}
