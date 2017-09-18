import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPage } from './product';

import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    ProductPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductPage),
    Ionic2RatingModule
  ],
  entryComponents: [
    ProductPage,
  ]
})
export class ProductPageModule {}
