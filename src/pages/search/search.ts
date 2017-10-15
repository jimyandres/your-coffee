import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import {YourCoffeeWebServiceProvider} from "../../providers/your-coffee-web-service/your-coffee-web-service";
import { ProductPage } from '../product/product';
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
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private yourCoffeeService: YourCoffeeWebServiceProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  showLoader(message:string = 'Cargando...') {
    this.loading = this.loadingCtrl.create({
      content: message
    });

    this.loading.present();
  
  }

  getItems(event: any) {
  	let query = event.target.value;

   	if (query && query.trim() != '') {
      this.showLoader();
   		this.yourCoffeeService.search(query).subscribe(
        (searchData) => {
          this.loading.dismiss();
    			this.products = searchData.data.filter(checkClass, 'product');
    			this.providers = searchData.data.filter(checkClass, 'provider');
    		},
        (err) => {
          this.loading.dismiss();
          console.log(err);
        }
      );
   	}
  }

  cancelSearch(event: any) {
  	this.navCtrl.pop();
  }

  seeProduct(product) {
  	this.showLoader();
    this.yourCoffeeService.product(product.idPublicacion).subscribe(
      (productInfo) => {
        this.loading.dismiss();
        this.navCtrl.push(ProductPage, {
            item: productInfo,
        });
      },
      (err) => {
        this.loading.dismiss();
        console.log(err);
      }
    );
  }

  seeProvider(provider) {
    this.showLoader();
    this.yourCoffeeService.provider(provider.id).subscribe(
      (providerInfo) => {
        this.loading.dismiss();
        this.navCtrl.push(ProviderPage, {
          item: providerInfo,
        });
      },
      (err) => {
        this.loading.dismiss();
        console.log(err);
      }
    );
  }

}
	
function checkClass(item) {
	return item.class === this;
}
