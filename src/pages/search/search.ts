import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {YourCoffeeWebServiceProvider} from "../../providers/your-coffee-web-service/your-coffee-web-service";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [YourCoffeeWebServiceProvider]
})
export class SearchPage {

  items: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private yourCoffeeService: YourCoffeeWebServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  getItems(event: any) {
  	let query = event.target.value;

  	this.yourCoffeeService.search(query).subscribe((data) => {
  		this.items = data.data;
  	});	
  }

  cancelSearch(event: any) {
  	this.navCtrl.pop();
  }

}
