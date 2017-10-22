import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Refresher } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { YourCoffeeWebServiceProvider } from "../../providers/your-coffee-web-service/your-coffee-web-service";
import { SearchPage } from "../search/search";
import { LoginPage } from "../login/login";
import { Storage } from '@ionic/storage';

import { BuyerPassConfirmationValidator } from "../../validators/buyer_pass_confirmation";
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [YourCoffeeWebServiceProvider],
})
export class ProfilePage {
  @ViewChild('signupSlider') signupSlider: any;

  refreshing: boolean = false;
  loading: any;
  token: any;
  user: any = {};
  profileSegment: string = '';
  fieldsOptions: any = {};

  personalDataForm: FormGroup;
  submitAttempt: boolean = false;
  nextAttempt: boolean = false;
  errors: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private yourCoffeeService: YourCoffeeWebServiceProvider,
              public loadingCtrl: LoadingController, public formBuilder: FormBuilder,
              public storage: Storage) {
    this.showLoader();
    this.reloadUser();
    this.profileSegment = 'personalData';
    this.personalDataForm = this.formBuilder.group({
      id: ['', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(10),
        Validators.pattern('^(\\d{8}|\\d{10})$'),
        Validators.required])],
      nombres: ['', Validators.compose([
        Validators.maxLength(45),
        Validators.pattern('^[a-zA-ZÀ-ž][\\sa-zA-ZÀ-ž]*$'),
        Validators.required])],
      apellidos: ['', Validators.compose([
        Validators.maxLength(45),
        Validators.pattern('^[a-zA-ZÀ-ž][\\sa-zA-ZÀ-ž]*$'),
        Validators.required])],
      email: ['', Validators.compose([
        Validators.maxLength(45),
        Validators.required])],
      password: ['', Validators.compose([
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'),
        Validators.required])],
      password_confirmation: ['', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        BuyerPassConfirmationValidator.isValid])],
      telefono: ['', Validators.compose([
        Validators.minLength(7),
        Validators.maxLength(10),
        Validators.pattern('^\\d{7,10}$'),
        Validators.required])],
      idNivelEstudios: ['', Validators.compose([
        Validators.required])]
    });

    let attrs = this.fieldsOptions.attributes;
    // for( var i=0; i<attrs.length; i++) {
      // formThreeFields[attrs[i].nombreAtributo] = [''];
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  doRefresh(refresher: Refresher) {
    this.refreshing = true;
    this.reloadUser(refresher);
  }

  showLoader(message:string = 'Cargando...') {
    this.loading = this.loadingCtrl.create({
      content: message
    });
    this.loading.present();
  }

  reloadUser(refresher?: Refresher) {
    this.storage.ready().then(() => {
      this.user = this.storage.get('user-token').then((token) => {
        if(token != null) {
          this.yourCoffeeService.user(token).then(
            (userInfo) => {
              this.user = userInfo;

              if (this.user.data == null) {
                  this.navCtrl.setRoot(LoginPage);
              }

              if(refresher && this.refreshing) {
                refresher.complete();
                this.refreshing = false;
              } else {
                this.loading.dismiss();
              }
            },
            (err) => {
              console.log(err);
              if(refresher && this.refreshing) {
                  refresher.cancel();
                  this.refreshing = false;
              } else {
                  this.loading.dismiss();
              }
            }
          );
        }
      });
    });
    this.yourCoffeeService.getRegister().subscribe((data) => {
      this.fieldsOptions = data;
    },
    (err) => {
      console.log(err);
    });
  }

  deleteAccount() {
    console.log('Deleting Account');
  }

}
