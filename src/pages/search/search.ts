import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {YourCoffeeWebServiceProvider} from "../../providers/your-coffee-web-service/your-coffee-web-service";

import { ProductPage } from '../product/product';

import { Searchbar } from 'ionic-angular';
import { ProviderPage } from "../provider/provider";

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

  products: Array<any> = [];
  providers: Array<any> = [];
  apiURL: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private yourCoffeeService: YourCoffeeWebServiceProvider) {
  	this.apiURL = this.yourCoffeeService.yourCoffeeUrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  getItems(event: any) {
  	let query = event.target.value;

   	if (query && query.trim() != '') {
   		this.yourCoffeeService.search(query).subscribe((searchData) => {
    			this.products = searchData.data.filter(checkClass, 'product');
    			this.providers = searchData.data.filter(checkClass, 'provider');
    		});
   	}
  }

  cancelSearch(event: any) {
  	this.navCtrl.pop();
  }

  seeProduct(product) {
  	this.yourCoffeeService.product(product.idPublicacion).subscribe((productInfo) => {
      	this.navCtrl.push(ProductPage, {
      		item: productInfo,
      		apiURL: this.apiURL
      	});
  	});
  }

    seeProvider(provider) {
        this.yourCoffeeService.provider(provider.id).subscribe((providerInfo) => {
            this.navCtrl.push(ProviderPage, {
                item: providerInfo,
                apiURL: this.apiURL
            });
        });
    }

}
	
function checkClass(item) {
	return item.class === this;
}
