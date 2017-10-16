import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage';
import { YourCoffeeWebServiceProvider } from "../../providers/your-coffee-web-service/your-coffee-web-service";

import { BuyerIdValidator } from "../../validators/buyer_id";
import { BuyerPassConfirmationValidator } from "../../validators/buyer_pass_confirmation";

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  @ViewChild('signupSlider') signupSlider: any;

  user: any = {};
  fieldsOptions: any = {};
  paises: any = [];
  departamentos: any = [];
  ciudades: any = [];

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;
  slideThreeForm: FormGroup;
  submitAttempt: boolean = false;
  nextAttempt: boolean = false;
  errors: any = {};

  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public events: Events, public yourCoffeeService: YourCoffeeWebServiceProvider,
              public storage: Storage, public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

    this.fieldsOptions = navParams.get('fieldsOptions');

    this.slideOneForm = this.formBuilder.group({
      id: ['', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(10),
        Validators.pattern('^(\\d{8}|\\d{10})$'),
        Validators.required,
        BuyerIdValidator.isValid])],
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

    this.slideTwoForm = formBuilder.group({
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

    let formThreeFields = {
      idFrecuenciaCompraCafe: ['', Validators.compose([
        Validators.required])],
    };

    let attrs = this.fieldsOptions.attributes;
    for( var i=0; i<attrs.length; i++) {
      formThreeFields[attrs[i].nombreAtributo] = [''];
    }

    this.slideThreeForm = formBuilder.group(formThreeFields);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
    this.country();

    this.signupSlider.lockSwipes(true);
  }

  showLoader(message:string = 'Cargando...') {
    this.loading = this.loadingCtrl.create({
      content: message
    });

    this.loading.present();
  }

  presentToast(msg?: string, status?: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      cssClass: status,
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration: 6000
    });
    toast.present();
  }

  signUp() {
    if(this.user) {
      this.showLoader();
      this.yourCoffeeService.register(this.user).subscribe(
        (res) => {
          if(res.status == 'success') {
            this.yourCoffeeService.setToken(res.token);
            this.yourCoffeeService.user(res.token).then((user: any) => {
              // console.log(user);
              this.loading.dismiss();
              this.presentToast('¡Bienvenido ' + user.data.nombres + ' ' + user.data.apellidos + '!', 'success');
              this.events.publish('auth:login', user);
            });
          } else {
            this.presentToast(res.message, res.status);
          }
        },
        (err) => {
          this.loading.dismiss();
          this.errors = err.errors;

          this.presentToast("La información proporcionada es inválida, por favor revisa nuevamente los campos.", "failed");
          this.signupSlider.lockSwipes(false);
          this.signupSlider.slideTo(0);
          this.signupSlider.lockSwipes(true);
        }
      );
    }
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

  departments(country) {
    this.showLoader();
    this.yourCoffeeService.departments(country).subscribe((data) => {
      this.loading.dismiss();
      this.departamentos = this.getValues(data);
    },
    (err) => {
      this.loading.dismiss();
      console.log(err);
    });
  }

  cities(department) {
    this.showLoader();
    this.yourCoffeeService.cities(department).subscribe((data) => {
      this.loading.dismiss();
      this.ciudades = this.getValues(data);
    },
    (err) => {
      this.loading.dismiss();
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

  parse(data) {
    var sub = (data.charAt(0).toUpperCase() + data.substr(1)).match(/[A-Z][a-z]+/g);
    return sub.join(' ');
  }

  next(){
    // this.signupSlider.slideNext();
    this.nextAttempt = false;

    let index = this.signupSlider.getActiveIndex();

    switch (index) {
      case 0:
        if(!this.slideOneForm.valid) {
          this.nextAttempt = true;
        } else {
          this.nextAttempt = false;
          this.signupSlider.lockSwipes(false);
          this.signupSlider.slideNext();
          this.signupSlider.lockSwipes(true);
        }
        break;

      case 1:
        if(!this.slideTwoForm.valid) {
          this.nextAttempt = true;
        } else {
          this.nextAttempt = false;
          this.signupSlider.lockSwipes(false);
          this.signupSlider.slideNext();
          this.signupSlider.lockSwipes(true);
        }
        break;

      case 2:
        if(!this.slideThreeForm.valid) {
          this.nextAttempt = true;
        } else {
          this.nextAttempt = false;
          this.signupSlider.lockSwipes(false);
          this.signupSlider.slideNext();
          this.signupSlider.lockSwipes(true);
        }
        break;  
      
      default:
        // code...
        break;
    }
  }

  prev(){
    this.signupSlider.lockSwipes(false);
    this.signupSlider.slidePrev();
    this.signupSlider.lockSwipes(true);
  }

  save(){
    this.submitAttempt = true;

    if(!this.slideOneForm.valid){
      this.signupSlider.lockSwipes(false);
      this.signupSlider.slideTo(0);
      this.signupSlider.lockSwipes(true);      
    }
    else if(!this.slideTwoForm.valid){
      this.signupSlider.lockSwipes(false);
      this.signupSlider.slideTo(1);
      this.signupSlider.lockSwipes(true);
    }
    else if(!this.slideThreeForm.valid){
      this.signupSlider.lockSwipes(false);
      this.signupSlider.slideTo(2);
      this.signupSlider.lockSwipes(true);
    }
    else {
      console.log("success!")
      // console.log(this.slideOneForm.value);
      // console.log(this.slideTwoForm.value);
      // console.log(this.slideThreeForm.value);

      this.user = Object.assign(this.user, this.slideOneForm.value, this.slideTwoForm.value, this.slideThreeForm.value);

      this.signUp();
    }
  }

}

export interface User {
  // Personal Information
  id: string;
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
  password_confirmation: string;
  telefono: string;
  idNivelEstudios: string;

  // Location Information
  pais: string;
  departamento: string;
  ciudad: string;
  direccion: string;
  direccionAuxiliar: string;
  codigoPostal: string;

  // Preferences information
  idFrecuenciaCompraCafe: string;
  tipoBeneficio: string;
  fragancia: string;
  acidez: string;
  dulce: string;
  tipoEmpaque: string;
  trilla: string;
  tostion: string;
  molienda: string;
  sabor: string;
  saborResidual: string;
}
