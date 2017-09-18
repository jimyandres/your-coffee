import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchPage } from "../search/search";

/**
 * Generated class for the ProductDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-description',
  templateUrl: 'product-description.html',
})
export class ProductDescriptionPage {

  description: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.description = navParams.get('description');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescriptionProductPage');
  }

  searchPage() {
    this.navCtrl.push(SearchPage);
  }
}
