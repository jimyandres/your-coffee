import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { YourCoffeeWebServiceProvider } from "../../providers/your-coffee-web-service/your-coffee-web-service";

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
  user = {} as User;
  step: any;
  stepCondition: any;
  stepDefaultCondition: any;
  currentStep: any;
  fieldsOptions: any = {};
  paises: any = [];
  departamentos: any = [];
  ciudades: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public evts: Events, public yourCoffeeService: YourCoffeeWebServiceProvider, public storage: Storage) {
    /**
     * Step Wizard Settings
     */
    this.step = 1;//The value of the first step, always 1
    this.stepCondition = true;//Set to true if you don't need condition in every step
    this.stepDefaultCondition = this.stepCondition;//Save the default condition for every step
    //You can subscribe to the Event 'step:changed' to handle the current step
    this.evts.subscribe('step:changed', step => {
      //Handle the current step if you need
      this.currentStep = step[0];
      //Set the step condition to the default value
      this.stepCondition = this.stepDefaultCondition;
    });
    this.evts.subscribe('step:next', () => {
      //Do something if next
      console.log('Next pressed: ', this.currentStep);
    });
    this.evts.subscribe('step:back', () => {
      //Do something if back
      console.log('Back pressed: ', this.currentStep);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
    this.loadFields();
    this.country();
  }

  signUp() {
    console.log("User registered!", this.user);
  }

  loadFields() {
    this.yourCoffeeService.getRegister().subscribe((data) => {
      this.fieldsOptions = data;
    },
    (err) => {
      console.log(err);
    });
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
    this.yourCoffeeService.departments(country).subscribe((data) => {
      this.departamentos = this.getValues(data);
    },
    (err) => {
      console.log(err);
    });
  }

  cities(department) {
    this.yourCoffeeService.cities(department).subscribe((data) => {
      this.ciudades = this.getValues(data);
    },
    (err) => {
      console.log(err);
    });
  }

  countryChange(val: any) {
    // console.log('Country Change:', val);
    // this.departamentos = [];
    // this.ciudades = [];
    if(val && val != '') {
      this.user.departamento = '';
      this.user.ciudad = '';
      this.departments(val);
    }
  }

  departmentChange(val: any) {
    // console.log('Department Change:', val);
    // this.ciudades = [];
    if(val && val != '') {
      this.user.ciudad = '';
      this.cities(val);
    }
  }

  parse(data) {
    var sub = (data.charAt(0).toUpperCase() + data.substr(1)).match(/[A-Z][a-z]+/g);
    return sub.join(' ');
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
