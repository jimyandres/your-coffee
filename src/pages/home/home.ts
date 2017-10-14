import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Refresher } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

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

    constructor(public navCtrl: NavController, private yourCoffeeService: YourCoffeeWebServiceProvider, public loadingCtrl: LoadingController) {
        this.showLoader();
        this.loadProducts();
        // console.log(this.apiURL);
    }

    doRefresh(refresher: Refresher) {
        // console.log('DOREFRESH', refresher);

        this.loadProducts(refresher);
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
                this.products = data.products;
                if(refresher) {
                    refresher.complete();
                }
                this.loading.dismiss();
            },
            (err) => {
                console.log(err);
                if(refresher) {
                    refresher.cancel();
                }
                this.loading.dismiss();
            }
        );
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
