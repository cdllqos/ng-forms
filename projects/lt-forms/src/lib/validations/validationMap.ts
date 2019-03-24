import { Validators } from '@angular/forms';

import { FieldValidator, ValidationModel } from '../model/validationModel';

import * as customValidations from './customValidation';

const validations: Map<string, (arg?: any) => FieldValidator> = new Map<string, (arg?: any) => FieldValidator>();

const initValidationMap = () => {
  validations.set('required', () => Validators.required);
  validations.set('minlength', (min: number) => Validators.minLength(min));
  validations.set('maxlength', (max: number) => Validators.maxLength(max));
  validations.set('min', (min: number) => Validators.min(min));
  validations.set('max', (max: number) => Validators.max(max));
  validations.set('email', () => Validators.email);
  validations.set('pattern', (pattern: string | RegExp) => Validators.pattern(pattern));
  validations.set('phone', () => customValidations.phone);
};

const getValidation = (validationModel: ValidationModel): FieldValidator | null => {
  const validator = validations.get(validationModel.name);
  if (validator) {
    return validator(validationModel.args);
  }
  return null;
};

const getValidations = (validationModels: Array<ValidationModel>): FieldValidator => {
  const resultValidations: Array<FieldValidator> = [];
  validationModels.forEach(validationModel => {
    const validation = getValidation(validationModel);
    if (validation) {
      resultValidations.push(validation);
    }
  });
  return resultValidations;
};
export { getValidations, initValidationMap };
