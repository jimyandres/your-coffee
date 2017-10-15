import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Refresher } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { InfiniteScroll } from 'ionic-angular';

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
  products: any = [];
  paginator: any = {};
  item: any;
  apiURL: string = '';
  providerSegment: string = '';
  loading: any;
  hasMore: boolean;
  refreshing: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private yourCoffeeService: YourCoffeeWebServiceProvider, public loadingCtrl: LoadingController) {
    this.item = navParams.get('item');
    this.providerSegment = 'provider';
    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProviderPage');
  }

  shouldScroll() {
    if(this.paginator.current_page < this.paginator.last_page) {
        // if(this.infiniteScroll) {
        //     this.infiniteScroll.enable(false);
        // }
        this.hasMore = true;
    } else {
        // if(this.infiniteScroll) {
        //     this.infiniteScroll.enable(true);
        // }
        this.hasMore = false;
    }
  }

  doRefresh(refresher: Refresher) {
      // console.log('DOREFRESH', refresher);

    this.refreshing = true;
    this.reloadProvider(refresher);
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    // console.log("DOINFINITE", infiniteScroll);

    // this.mockProvider.getAsyncData().then((newData) => {
    //     for (var i = 0; i < newData.length; i++) {
    //         this.items.push( newData[i] );
    //     }

    //     infiniteScroll.complete();

    //     if (this.items.length > 90) {
    //         infiniteScroll.enable(false);
    //     }
    // });
    // this.infiniteScroll = event;

    // this.shouldScroll();

    this.loadMore(infiniteScroll);

    // if(this.paginator.current_page == this.paginator.last_page) {
    //     infiniteScroll.enable(false);
    // } else {
    //     infiniteScroll.enable(true);
    //     this.loadMore(infiniteScroll);
    // }
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
    this.products = this.provider.productos.data;
    this.paginator = this.provider.productos;
    this.shouldScroll();
  }

  loadMore(infiniteScroll: InfiniteScroll) {
    if(this.paginator.current_page + 1 <= this.paginator.last_page) {
      this.yourCoffeeService.provider(this.provider.id, {'products': this.paginator.current_page + 1}).subscribe(
        (data) => {
          for (var i=0; i<data.provider.productos.data.length; i++) {
            this.products.push(data.provider.productos.data[i]);
          }
          this.paginator = data.provider.productos;

          this.shouldScroll();

          infiniteScroll.complete();
        },
        (err) => {
          console.log(err);
              
          infiniteScroll.complete();
        }
      );
    } else {
      this.shouldScroll();
      infiniteScroll.enable(false);
    }
  }

  reloadProvider(refresher: Refresher) {
    this.yourCoffeeService.provider(this.provider.id).subscribe(
      (providerInfo) => {
        this.item = providerInfo;
        this.loadData();

        if(this.refreshing) {
          refresher.complete();
          this.refreshing = false;
        }
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
