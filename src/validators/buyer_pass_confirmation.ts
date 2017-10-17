import { FormControl } from '@angular/forms';

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
