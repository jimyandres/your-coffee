import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

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
    apiURL: string;
    photoUrl: string = '';

    constructor(public navCtrl: NavController, private yourCoffeeService: YourCoffeeWebServiceProvider) {
        this.loadProducts();
        this.apiURL = this.yourCoffeeService.yourCoffeeUrl;
        // console.log(this.apiURL);
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

    loadProducts() {
        this.yourCoffeeService.load().subscribe((data) => {
            this.attributes = data.attributes;
            this.varieties = data.variedad_cafe;
            this.locations = data.ubicaciones;
            this.price_range = [{min: Number(data.min_price), max: Number(data.max_price)}];
            this.products = data.products;
        });
    }

    showProduct(id) {
        this.yourCoffeeService.product(id).subscribe((productInfo) => {
            this.navCtrl.push(ProductPage, {
                item: productInfo,
                apiURL: this.apiURL
            });
        });
    }
}
