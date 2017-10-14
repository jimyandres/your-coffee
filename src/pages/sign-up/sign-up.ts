import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage';
import { YourCoffeeWebServiceProvider } from "../../providers/your-coffee-web-service/your-coffee-web-service";

import { buyerIdValidator } from "../../validators/buyer_id";
import { buyerPassConfirmationValidator } from "../../validators/buyer_pass_confirmation";

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
  fieldsOptions: any = {};
  paises: any = [];
  departamentos: any = [];
  ciudades: any = [];

  @ViewChild('signupSlider') signupSlider: any;

  slideOneForm: FormGroup;
  slideTwoForm: FormGroup;
  slideThreeForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public evts: Events, public yourCoffeeService: YourCoffeeWebServiceProvider,
              public storage: Storage, public formBuilder: FormBuilder) {
    this.slideOneForm = formBuilder.group({
      id: ['', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(10),
        Validators.pattern('(\\d{8}|\\d{10})'),
        buyerIdValidator.isValid])],
      nombres: ['', Validators.compose([
        Validators.maxLength(45),
        Validators.pattern('[a-zA-ZÀ-ž][\\sa-zA-ZÀ-ž]*'),
        Validators.required])],
      apellidos: ['', Validators.compose([
        Validators.maxLength(45),
        Validators.pattern('[a-zA-ZÀ-ž][\\sa-zA-ZÀ-ž]*'),
        Validators.required])],
      email: ['', Validators.compose([
        Validators.maxLength(45),
        Validators.required])],
      password: ['', Validators.compose([
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+'),
        Validators.required])],
      password_confirmation: ['', Validators.compose([
        Validators.minLength(8),
        buyerPassConfirmationValidator.isValid])],
      telefono: ['', Validators.compose([
        Validators.minLength(7),
        Validators.maxLength(10),
        Validators.pattern('\\d{7,10}'),
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
        Validators.pattern('\\d{0,10}'),
        Validators.required])]
    });

    this.slideThreeForm = formBuilder.group({
      idFrecuenciaCompraCafe: ['', Validators.compose([
        Validators.required])],
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

  next(){
    this.signupSlider.slideNext();
  }

  prev(){
    this.signupSlider.slidePrev();
  }

  save(){
    this.submitAttempt = true;

    if(!this.slideOneForm.valid){
      this.signupSlider.slideTo(0);
    }
    else if(!this.slideTwoForm.valid){
      this.signupSlider.slideTo(1);
    }
    else if(!this.slideThreeForm.valid){
      this.signupSlider.slideTo(2);
    }
    else {
      console.log("success!")
      console.log(this.slideOneForm.value);
      console.log(this.slideTwoForm.value);
      console.log(this.slideThreeForm.value);
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
