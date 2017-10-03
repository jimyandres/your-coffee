import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController } from 'ionic-angular';
import { SearchPage } from "../search/search";
import { ProductDescriptionPage } from "../product-description/product-description";
import { ProductDetailsPage } from "../product-details/product-details";
import { ModalPurchasePage } from "../modal-purchase/modal-purchase";
import { ProductQuestionsPage } from "../product-questions/product-questions";
import { ProductReviewsPage } from "../product-reviews/product-reviews";
import { ProviderPage } from "../provider/provider";
import { YourCoffeeWebServiceProvider } from "../../providers/your-coffee-web-service/your-coffee-web-service";

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
  providers: [YourCoffeeWebServiceProvider],
})
export class ProductPage {

  selectedItem: any;
  product: any = [];
  questions: any;
  reviews: any;
  methods: any;
  admin: any;
  apiURL: string = '';

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController, private yourCoffeeService: YourCoffeeWebServiceProvider) {
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
  seeProvider(id) {
    this.yourCoffeeService.provider(id).subscribe(
      (providerInfo) => {
        this.navCtrl.push(ProviderPage, {
          item: providerInfo,
          apiURL: this.apiURL
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loadData() {
    this.product = this.selectedItem.product;
    this.questions = this.selectedItem.questions;
    this.reviews = this.selectedItem.reviews;
    this.methods = this.selectedItem.metodos_pago;
    this.admin = this.product.admin;
  }

  seeDescription() {
    this.navCtrl.push(ProductDescriptionPage, {
      description: this.product.descripcion,
    });
  }

  seeDetails() {
    this.navCtrl.push(ProductDetailsPage, {
      details: this.product.atributos,
      variety: this.product.variedad_cafe.tipo,
    });
  }

  seeQuestions() {
    this.navCtrl.push(ProductQuestionsPage, {
      questions: this.questions,
    });
  }

  seeReviews() {
    this.navCtrl.push(ProductReviewsPage, {
      reviews: this.reviews,
    });
  }

  makePurchase() {
    let modal = this.modalCtrl.create(ModalPurchasePage, { 'admin': this.admin });
    modal.present();
  }
}
