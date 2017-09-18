import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalPurchasePage } from './modal-purchase';

@NgModule({
  declarations: [
    ModalPurchasePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalPurchasePage),
  ],
})
export class ModalPurchasePageModule {}
