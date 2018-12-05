import { ValidatorFn, ValidationErrors } from '@angular/forms';
interface ValidationModel {
  name: string;
  args?: any;
  formatError?: (error?: any) => string;
}

interface ValidationMap {
  name: string;
  getValidation: (arg?: any) => FieldValidator;
}
type FieldValidator = ValidatorFn | ValidatorFn[] | ValidationErrors | null;
export { ValidationModel, ValidationMap, FieldValidator };
