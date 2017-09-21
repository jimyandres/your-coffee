import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductReviewsPage } from './product-reviews';

@NgModule({
  declarations: [
    ProductReviewsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductReviewsPage),
  ],
})
export class ProductReviewsPageModule {}
