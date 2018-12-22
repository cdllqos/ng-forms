import { ValidatorFn, ValidationErrors } from '@angular/forms';
interface ValidationModel {
  name: string;
  args?: any;
  formatError?: (error?: any) => string;
}
type FieldValidator = ValidatorFn | ValidatorFn[] | ValidationErrors | null;
export { ValidationModel, FieldValidator };
