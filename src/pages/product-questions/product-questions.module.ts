import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductQuestionsPage } from './product-questions';

@NgModule({
  declarations: [
    ProductQuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductQuestionsPage),
  ],
})
export class ProductQuestionsPageModule {}
