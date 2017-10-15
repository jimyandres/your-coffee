import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Refresher } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { InfiniteScroll } from 'ionic-angular';

import {ProductPage} from '../product/product';
import {SearchPage} from "../search/search";
import {YourCoffeeWebServiceProvider} from "../../providers/your-coffee-web-service/your-coffee-web-service";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [YourCoffeeWebServiceProvider]
})
export class HomePage {

    attributes: any;
    varieties: any;
    locations: any;
    price_range: any;
    products: any = [];
    photoUrl: string = '';
    loading: any;
    paginator: any = {};
    hasMore: boolean;
    refreshing: boolean = false;
    // refresher: Refresher;
    // infiniteScroll: InfiniteScroll;

    constructor(public navCtrl: NavController, private yourCoffeeService: YourCoffeeWebServiceProvider, public loadingCtrl: LoadingController) {
        this.showLoader();
        this.loadProducts();
        // console.log(this.apiURL);
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

        // this.refresher = event;

        // this.shouldScroll();

        this.refreshing = true;

        this.loadProducts(refresher);
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

    itemTapped(event, item) {
        // Get the product data to show
        // console.log(item);
        item = this.showProduct(item.idPublicacion);
        // console.log(item);
    }

    searchPage() {
        this.navCtrl.push(SearchPage);
    }

    loadProducts(refresher?: Refresher) {
        this.yourCoffeeService.load().subscribe(
            (data) => {
                this.attributes = data.attributes;
                this.varieties = data.variedad_cafe;
                this.locations = data.ubicaciones;
                this.price_range = [{min: Number(data.min_price), max: Number(data.max_price)}];
                this.products = data.products.data;
                this.paginator = data.products;
                this.shouldScroll();

                if(refresher && this.refreshing) {
                    refresher.complete();
                    this.refreshing = false;
                } else {
                    this.loading.dismiss();
                }
            },
            (err) => {
                console.log(err);
                if(refresher && this.refreshing) {
                    refresher.cancel();
                    this.refreshing = false;
                } else {
                    this.loading.dismiss();
                }
            }
        );
    }

    loadMore(infiniteScroll: InfiniteScroll) {
        if(this.paginator.current_page + 1 <= this.paginator.last_page) {
            this.yourCoffeeService.load({'page': this.paginator.current_page + 1}).subscribe(
                (data) => {
                    for (var i=0; i<data.products.data.length; i++) {
                        this.products.push(data.products.data[i]);
                    }
                    this.paginator = data.products;

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
}
