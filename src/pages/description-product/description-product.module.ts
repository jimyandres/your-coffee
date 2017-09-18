import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DescriptionProductPage } from './description-product';

@NgModule({
  declarations: [
    DescriptionProductPage,
  ],
  imports: [
    IonicPageModule.forChild(DescriptionProductPage),
  ],
})
export class DescriptionProductPageModule {}
