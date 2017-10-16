import { AbstractControl, FormControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, forwardRef, Attribute } from '@angular/core';

export class BuyerPassConfirmationValidator {

  static isValid(control: FormControl): any {
    let password = control.root.value.password; // to get value in input tag

    if(password !== control.value){
      return {
        "¡Las contraseñas no coinciden!": true
      };
    }

    return null;
  }

}
