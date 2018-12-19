import { AbstractControl, ValidationErrors } from '@angular/forms';
const phone = (control: AbstractControl): ValidationErrors => {
  const numberRe = /^[0-9]+.?[0-9]*/;
  if (control.value && control.value.length === 11 && numberRe.test(control.value)) {
    return null;
  }
  return {
    phone: 'not a valid phone number',
  };
};
export { phone };
