import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchPage } from "../search/search";

/**
 * Generated class for the ProductQuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-questions',
  templateUrl: 'product-questions.html',
})
export class ProductQuestionsPage {

  questions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.questions = navParams.get('questions');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductQuestionsPage');
  }

  searchPage() {
    this.navCtrl.push(SearchPage);
  }

}
