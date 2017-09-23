import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
})
export class ProviderPage {

  provider: any = [];
  item: any;
  apiURL: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.apiURL = navParams.get('apiURL');
    this.item = navParams.get('item');
    this.loadData()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProviderPage');
  }


  loadData() {
    this.provider = this.item.provider;
  }
}
