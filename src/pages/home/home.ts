import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {ProductPage} from '../product/product';
import {SearchPage} from "../search/search";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController) {

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
}
