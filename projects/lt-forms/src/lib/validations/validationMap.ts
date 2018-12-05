import { ValidationModel, FieldValidator, ValidationMap } from '../model/validationModel';
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
