import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchPage } from "../search/search";

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  details: any = [];
  variety: string = '';
  html: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.details = navParams.get('details');
    this.variety = navParams.get('variety')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

  searchPage() {
    this.navCtrl.push(SearchPage);
  }

  parse(data) {
    var sub = (data.charAt(0).toUpperCase() + data.substr(1)).match(/[A-Z][a-z]+/g);
    return sub.join(' ');
  }

  symbols(data) {
    switch(data){
      case "&half; Kilo (1 Libra)":
        return "&half; Kilo (1 Libra)";
      default:
        return data;
    }
  }
}
