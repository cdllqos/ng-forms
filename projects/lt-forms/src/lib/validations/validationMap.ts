import {Validators} from '@angular/forms';

import {FieldValidator, ValidationModel} from '../model/validationModel';

import * as customValidations from './customValidation';

function initValidationMap() {
  const map: Map<string, (arg?: any) => FieldValidator> = new Map();
  map.set('required', () => Validators.required);
  map.set('minlength', (min: number) => Validators.minLength(min));
  map.set('maxlength', (max: number) => Validators.maxLength(max));
  map.set('min', (min: number) => Validators.min(min));
  map.set('max', (max: number) => Validators.max(max));
  map.set('email', () => Validators.email);
  map.set('pattern', (pattern: string|RegExp) => Validators.pattern(pattern));
  validations.set('phone', () => customValidations.phone);
  return map;
}

const validations: Map<string, (arg?: any) => FieldValidator> =
    initValidationMap();


const getValidation =
    (validationModel: ValidationModel): FieldValidator|null => {
      const validator = validations.get(validationModel.name);
      if (validator) {
        return validator(validationModel.args);
      }
      return null;
    };

const getValidations =
    (validationModels: Array<ValidationModel>): FieldValidator => {
      const resultValidations: Array<FieldValidator> = [];
      validationModels.forEach((validationModel) => {
        const validation = getValidation(validationModel);
        if (validation) {
          resultValidations.push(validation);
        }
      });
      return resultValidations;
    };
export {getValidations};
