import { FormControl } from '@angular/forms';

export class BuyerIdValidator {

  static isValid(control: FormControl): any {

    if(isNaN(control.value || control.value % 1 !== 0)){
      return {
        "No es un número válido": true
      };
    }

    return null;
  }

}
