import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { Events } from 'ionic-angular';

// import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { YourCoffeeWebServiceProvider } from "../../providers/your-coffee-web-service/your-coffee-web-service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, /*public user: UserProvider*/public yourCoffeeService: YourCoffeeWebServiceProvider, public toastCtrl: ToastController, public storage: Storage, private events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login() {
    this.yourCoffeeService.login(this.credentials).subscribe(
      (res) => {
        if (res.status == 'success') {
          this.yourCoffeeService.setToken(res.token);
          // this.user._loggedIn(res);
          // let user = this.checkUser(res.token);
          this.yourCoffeeService.user(res.token).then((user: any) => {
            // console.log(user);
            this.presentToast('¡Bienvenido ' + user.data.nombres + ' ' + user.data.apellidos + '!', 'success');
            this.events.publish('auth:login', user);
          });
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

  checkUser(token) {
    this.yourCoffeeService.user(token).then(user => {
      console.log(user);
      return user;
    });
    // this.storage.get('user-token').then((token) => {
    //   console.log(token);
    //   this.storage.get('user-detail').then((user) => {
    //     console.log(user);
    //   },
    //   (err) => {
    //     console.log(err);
    //   });
    // },
    // (err) => {
    //   console.log(err);
    // });
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
