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

    public attributes: any;
    public varieties: any;
    public locations: any;
    public price_range: Array<{min: Number, max: Number}> = [];
    public products: Array<any> = [];

    constructor(public navCtrl: NavController, private yourCoffeeService: YourCoffeeWebServiceProvider) {
        this.loadProducts();
    }

    itemTapped(event, item) {
        // Get the product data to show
        this.navCtrl.push(ProductPage, {
            item: item
        });
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
        console.log(this.products);
    }
}
