import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the YourCoffeeWebServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class YourCoffeeWebServiceProvider {

  yourCoffeeUrl : string = "/api";

  constructor(public http: Http) {
    console.log('Hello YourCoffeeWebServiceProvider Provider');
  }
// : Observable<YourCoffeeWebServiceProvider[]>
  load() {
  	let headers = new Headers({'Accept': 'application/json'});
 //  	if (this.data) {
	// 	// already loaded data
	// 	return Promise.resolve(this.data);
	// }

	// don't have the data yet
	// return new Promise(resolve => {
	// 	// We're using Angular HTTP provider to request the data,
	//     // then on the response, it'll map the JSON data to a parsed JS object.
	//     // Next, we process the data and resolve the promise with the new data.
	//     this.http.get(this.yourCoffeeUrl + 'home')
	//     	.map(res => res.json())
	//     	.subscribe(data => {
	//     		// we've got back the raw data, now generate the core schedule data
	//     		// and save the data for later reference
	//     		this.data = data;
	//     		resolve(this.data);
	//     	});
 //    });
 	return  this.http.get(this.yourCoffeeUrl + "/api/home")
            .do((res : Response ) => console.log(res.json()))
            .map((res : Response ) => res.json());
            // .catch(error => console.log(error));

 	// return this.http.get(this.yourCoffeeUrl + 'home')
  //                .map(res => res.json())
  //                .catch(this.handleError);
    }

    product(id) {
      return this.http.get(this.yourCoffeeUrl + "/api/product/" + id)
            .do((res : Response ) => console.log(res.json()))
            .map((res : Response ) => res.json());
    }

    // handleError(error) {
    //   console.error(error);
    //   return Observable.throw(error.json().error || 'Server error');
    // }
  }
