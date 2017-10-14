import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Refresher } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

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
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private yourCoffeeService: YourCoffeeWebServiceProvider, public loadingCtrl: LoadingController) {
    this.item = navParams.get('item');
    this.providerSegment = 'provider';
    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProviderPage');
  }

  doRefresh(refresher: Refresher) {
      // console.log('DOREFRESH', refresher);

    this.reloadProvider(refresher);
  }

  showLoader(message:string = 'Cargando...') {
    this.loading = this.loadingCtrl.create({
      content: message
    });

    this.loading.present();
  
  }

  loadData() {
    this.provider = this.item.provider;
    this.provider.annosCafetal = this.provider.añosCafetal; // Reason: Letter ñ not supported!
  }

  reloadProvider(refresher: Refresher) {
    this.yourCoffeeService.provider(this.provider.id).subscribe(
      (providerInfo) => {
        this.item = providerInfo;
        this.loadData();
        refresher.complete();
      },
      (err) => {
        refresher.cancel();
        console.log(err);
      }
    );
  }

  itemTapped(event, item) {
    // Get the product data to show
    this.showProduct(item.idPublicacion);
  }

  showProduct(id) {
    this.showLoader();
    this.yourCoffeeService.product(id).subscribe(
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

  searchPage() {
    this.navCtrl.push(SearchPage);
  }
}
