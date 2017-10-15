import { Component, ViewChild } from '@angular/core';
import { IonicPage, Navbar, NavController, NavParams } from 'ionic-angular';
import { InfiniteScroll } from 'ionic-angular';

import { SearchPage } from "../search/search";
import {YourCoffeeWebServiceProvider} from "../../providers/your-coffee-web-service/your-coffee-web-service";

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
  @ViewChild(Navbar) navBar: Navbar;

  data: any;
  paginator: any = {};
  hasMore: boolean;
  product:string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private yourCoffeeService: YourCoffeeWebServiceProvider) {
  	let info = navParams.get('questions');

    this.data = info.data;
    this.paginator = info;
    this.product = navParams.get('product');
    this.shouldScroll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductQuestionsPage');

    this.navBar.backButtonClick = (e:UIEvent)=>{
      this.paginator.data = this.data;
      this.navCtrl.getPrevious().data.questions = this.paginator;
      this.navCtrl.pop();
    }
  }

  shouldScroll() {
    if(this.paginator.current_page < this.paginator.last_page) {
      // if(this.infiniteScroll) {
      //     this.infiniteScroll.enable(false);
      // }
      this.hasMore = true;
    } else {
      // if(this.infiniteScroll) {
      //     this.infiniteScroll.enable(true);
      // }
      this.hasMore = false;
    }
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    // console.log("DOINFINITE", infiniteScroll);

    if(this.paginator.current_page + 1 <= this.paginator.last_page) {
      this.yourCoffeeService.product(this.product, {'preguntas': this.paginator.current_page + 1}).subscribe(
        (data) => {
          for (var i=0; i<data.questions.data.length; i++) {
            this.data.push(data.questions.data[i]);
          }
          this.paginator = data.questions;

          this.shouldScroll();

          infiniteScroll.complete();
        },
        (err) => {
          console.log(err);
              
          infiniteScroll.complete();
        }
      );
    } else {
      this.shouldScroll();
      infiniteScroll.enable(false);
    }
  }

  searchPage() {
    this.navCtrl.push(SearchPage);
  }

}
