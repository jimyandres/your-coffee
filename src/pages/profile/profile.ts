import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Refresher } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { YourCoffeeWebServiceProvider } from "../../providers/your-coffee-web-service/your-coffee-web-service";
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
  updateData: any = {};
  profileSegment: string = '';
  fieldsOptions: any = {};
  paises: any = [];
  departamentos: any = [];
  ciudades: any = [];

  personalDataForm: FormGroup;
  locationForm: FormGroup;
  coffeePreferencesForm: FormGroup;
  submitAttempt: boolean = false;
  nextAttempt: boolean = false;
  errors: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private yourCoffeeService: YourCoffeeWebServiceProvider,
              public loadingCtrl: LoadingController, public formBuilder: FormBuilder,
              public storage: Storage, private events: Events) {
    this.showLoader();
    // this.loadUser();
    
    this.fieldsOptions = navParams.get('field_options');
    this.user = navParams.get('user');

    // console.log(this.fieldsOptions);

    this.profileSegment = 'personalData';
    this.personalDataForm = formBuilder.group({
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
      correoElectronico: ['', Validators.compose([
        Validators.maxLength(45),
        Validators.required])],
      password: ['', Validators.compose([
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')])],
      password_confirmation: ['', Validators.compose([
        Validators.minLength(8),
        BuyerPassConfirmationValidator.isValid])],
      telefono: ['', Validators.compose([
        Validators.minLength(7),
        Validators.maxLength(10),
        Validators.pattern('^\\d{7,10}$'),
        Validators.required])],
      idNivelEstudios: [this.user.idNivelEstudios, Validators.compose([
        Validators.required])]
    });

    this.locationForm = formBuilder.group({
      pais: ['', Validators.compose([
        Validators.maxLength(45),
        Validators.required])],
      departamento: ['', Validators.compose([
        Validators.maxLength(45),
        Validators.required])],
      ciudad: ['', Validators.compose([
        Validators.maxLength(45),
        Validators.required])],
      direccion: ['', Validators.compose([
        Validators.maxLength(60),
        Validators.required])],
      direccionAuxiliar: ['', Validators.compose([
        Validators.maxLength(60)])],
      codigoPostal: ['', Validators.compose([
        Validators.maxLength(10),
        Validators.pattern('^\\d{0,10}$'),
        Validators.required])]
    });
    
    let coffeePreferencesFields = {
      idFrecuenciaCompraCafe: ['', Validators.compose([
        Validators.required])],
    };

    let attrs = this.fieldsOptions.attributes;
    for( var i=0; i<attrs.length; i++) {
      coffeePreferencesFields[attrs[i].nombreAtributo] = [''];
    }

    this.coffeePreferencesForm = formBuilder.group(coffeePreferencesFields);

    this.departments(this.user.direccion.pais, true);
    this.cities(this.user.direccion.departamento, true);

    this.loading.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.country();
  }

  doRefresh(refresher: Refresher) {
    this.refreshing = true;
    this.loadFields();
    this.loadUser(refresher);
  }

  showLoader(message:string = 'Cargando...') {
    this.loading = this.loadingCtrl.create({
      content: message
    });
    this.loading.present();
  }

  parse(data) {
    var sub = (data.charAt(0).toUpperCase() + data.substr(1)).match(/[A-Z][a-z]+/g);
    return sub.join(' ');
  }

  getValues(obj) {
    return Object.keys(obj).map(function(k) { return obj[k] });
  }

  country() {
    this.yourCoffeeService.country().subscribe((data) => {
      this.paises = this.getValues(data);
    },
    (err) => {
      console.log(err);
    });
  }

  departments(country, init:boolean=false) {
    if(!init) {
      this.showLoader();
    }
    this.yourCoffeeService.departments(country).subscribe((data) => {
      if(!init) {
        this.loading.dismiss();
      }
      this.departamentos = this.getValues(data);
    },
    (err) => {
      if(!init) {
        this.loading.dismiss();
      }
      console.log(err);
    });
  }

  cities(department, init:boolean=false) {
    if(!init) {
      this.showLoader();
    }
    this.yourCoffeeService.cities(department).subscribe((data) => {
      if(!init) {
        this.loading.dismiss();
      }
      this.ciudades = this.getValues(data);
    },
    (err) => {
      if(!init) {
        this.loading.dismiss();
      }
      console.log(err);
    });
  }

  countryChange(val: any) {
    // console.log('Country Change:', val);
    // this.departamentos = [];
    // this.ciudades = [];
    if(val && val != '') {
      // this.user.departamento = '';
      // this.user.ciudad = '';
      this.departments(val);
    }
  }

  departmentChange(val: any) {
    // console.log('Department Change:', val);
    // this.ciudades = [];
    if(val && val != '') {
      // this.slideTwoForm.controls.ciudad.value = '';
      // this.ciudades = [];
      this.cities(val);
    }
  }

  loadFields() {
    this.yourCoffeeService.getRegister().subscribe((data) => {
      this.fieldsOptions = data;
    },
    (err) => {
      console.log(err);
    });
  }

  loadUser(refresher?: Refresher) {
    let reload = false;
    if(refresher) {
      reload = true;
    }
    this.storage.get('user-token').then((token) => {
      if(token) {
        this.yourCoffeeService.user(token, reload).then(
          (userInfo:any) => {
            this.user = userInfo.data;

            if (this.user == null) {
                this.events.publish('auth:logout', {'data': null});
                this.navCtrl.setRoot(LoginPage);
            }

            this.departments(this.user.direccion.pais, true);
            this.cities(this.user.direccion.departamento, true);

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
  }

  deleteAccount() {
    console.log('Deleting Account');
  }

  fixField() {
    this.updateData.contraseña = this.updateData.password;
    delete this.updateData.password;
    this.updateData.contraseña_confirmation = this.updateData.password_confirmation;
    delete this.updateData.password_confirmation;
  }

  updateProfile() {
    console.log('Updating Account');
    this.updateData = Object.assign(this.updateData, this.personalDataForm.value, this.locationForm.value, this.coffeePreferencesForm.value);
    this.fixField();
    console.log(this.updateData);
  }

}
