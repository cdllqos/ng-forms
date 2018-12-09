import { ValidationModel, FieldValidator, ValidationMap } from '../model/validationModel';
import * as customValidations from './customValidation';
import { Validators } from '@angular/forms';

const validations: Array<ValidationMap> = [
  {
    name: 'required',
    getValidation: () => Validators.required,
  },
  {
    name: 'minlength',
    getValidation: (min) => Validators.minLength(min),
  },
  {
    name: 'maxlength',
    getValidation: (max) => Validators.maxLength(max),
  },
  {
    name: 'min',
    getValidation: (min) => Validators.min(min),
  },
  {
    name: 'max',
    getValidation: (max) => Validators.max(max),
  },
  {
    name: 'email',
    getValidation: () => Validators.email,
  },
  {
    name: 'pattern',
    getValidation: (pattern) => Validators.pattern(pattern),
  },
  {
    name: 'phone',
    getValidation: () => customValidations.phone,
  },
];
const getValidation = (validationModel: ValidationModel) => {
  const validation = validations.find((m) => m.name === validationModel.name);
  if (validation) {
    return validation.getValidation(validationModel.args);
  }
  return null;
};

const getValidations = (validationModels: Array<ValidationModel>): FieldValidator => {
  const resultValidations: Array<FieldValidator> = [];
  validationModels.forEach((validationModel) => {
    const validation = getValidation(validationModel);
    if (validation) {
      resultValidations.push(validation);
    }
  });
  return resultValidations;
};
export { getValidations };
