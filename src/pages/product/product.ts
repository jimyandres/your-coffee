import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import {SearchPage} from "../search/search";
import { ProductDescriptionPage } from "../product-description/product-description";

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  selectedItem: any;
  product: any = [];
  questions: any;
  reviews: any;
  methods: any;
  apiURL: string = '';

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.apiURL = navParams.get('apiURL');
    this.selectedItem = navParams.get('item');
    this.loadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

  searchPage() {
    this.navCtrl.push(SearchPage);
  }

  // Redirect to the Provider Profile
  seeProvider() {
    console.log(this.product.proveedor);
  }

  loadData() {
    this.product = this.selectedItem.product;
    this.questions = this.selectedItem.questions;
    this.reviews = this.selectedItem.reviews;
    this.methods = this.selectedItem.metodos_pago;
  }

  seeDescription() {
    this.navCtrl.push(ProductDescriptionPage, {
      description: this.product.descripcion,
    });
  }

  seeDetails() {
    console.log(this.product.atributos);
  }

  seeQuestions() {
    console.log(this.questions);
  }

  seeReviews() {
    console.log(this.reviews);
  }
}
