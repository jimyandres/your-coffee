import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from '../pages/about/about';
import { SearchPage } from '../pages/search/search';
import { ListPage } from '../pages/list/list';
import { ProductPage } from '../pages/product/product';
import { ProductDescriptionPage } from "../pages/product-description/product-description";
import { ProductDetailsPage } from "../pages/product-details/product-details";
import { ModalPurchasePage } from "../pages/modal-purchase/modal-purchase";
import { ProductQuestionsPage } from "../pages/product-questions/product-questions";
import { ProductReviewsPage } from "../pages/product-reviews/product-reviews";
import { ProviderPage } from "../pages/provider/provider";
import { LoginPage } from "../pages/login/login";
import { SignUpPage } from "../pages/sign-up/sign-up"

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { YourCoffeeWebServiceProvider } from '../providers/your-coffee-web-service/your-coffee-web-service';
import { HttpModule } from '@angular/http';

// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    AboutPage,
    SearchPage,
    ProductPage,
    ProductDescriptionPage,
    ProductDetailsPage,
    ModalPurchasePage,
    ProductQuestionsPage,
    ProductReviewsPage,
    ProviderPage,
    LoginPage,
    SignUpPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    Ionic2RatingModule,
    BrowserAnimationsModule,
    MomentModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    AboutPage,
    SearchPage,
    ProductPage,
    ProductDescriptionPage,
    ProductDetailsPage,
    ModalPurchasePage,
    ProductQuestionsPage,
    ProductReviewsPage,
    ProviderPage,
    LoginPage,
    SignUpPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    YourCoffeeWebServiceProvider
  ]
})

export class AppModule {}
