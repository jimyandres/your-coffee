import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';

import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials : { email: string, password: string } = { email:'', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public user: UserProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.user.login(this.credentials).subscribe(
      (res) => {
        if (res.status == 'success') {
          this.presentToast('Credenciales válidas', 'success');
        } else {
          this.presentToast(res.message, res.status);
        }
      },
      (err) => {
        // console.log(err);
        this.presentToast(err.message, err.status);
      }
    );
  }

  signUp() {
    this.navCtrl.push(SignUpPage);
  }

  presentToast(msg?: string, status?: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      cssClass: status,
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration: 4000
    });
    toast.present();
  }

}
