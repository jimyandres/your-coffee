import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YourCoffeeWebServiceProvider } from "../../providers/your-coffee-web-service/your-coffee-web-service";
import { ProductPage } from "../product/product";
import { SearchPage } from "../search/search";

/**
 * Generated class for the ProviderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-provider',
  templateUrl: 'provider.html',
  providers: [YourCoffeeWebServiceProvider],
})
export class ProviderPage {

  provider: any = [];
  item: any;
  apiURL: string = '';
  providerSegment: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private yourCoffeeService: YourCoffeeWebServiceProvider) {
    this.apiURL = navParams.get('apiURL');
    this.item = navParams.get('item');
    this.providerSegment = 'provider';
    this.loadData()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProviderPage');
  }

  loadData() {
    this.provider = this.item.provider;
    this.provider.annosCafetal = this.provider.añosCafetal; // Reason: Letter ñ not supported!
  }

  itemTapped(event, item) {
    // Get the product data to show
    this.showProduct(item.idPublicacion);
  }

  showProduct(id) {
    this.yourCoffeeService.product(id).subscribe((productInfo) => {
      this.navCtrl.push(ProductPage, {
        item: productInfo,
        apiURL: this.apiURL
      });
    });
  }

  searchPage() {
    this.navCtrl.push(SearchPage);
  }
}
