import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchPage } from "../search/search";

/**
 * Generated class for the ProductReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-reviews',
  templateUrl: 'product-reviews.html',
})
export class ProductReviewsPage {

  reviews: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.reviews = navParams.get('reviews');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductReviewsPage');
  }

  searchPage() {
    this.navCtrl.push(SearchPage);
  }

}
