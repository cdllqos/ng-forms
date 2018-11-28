import { ValidatorFn, AbstractControlOptions } from '@angular/forms';

interface FieldModel {
  key: string;
  type?: string;
  value?: any;
  validations?: ValidatorFn | ValidatorFn[] | AbstractControlOptions;
}
class FieldInstanceModel {
  model: FieldModel;
}
export { FieldModel, FieldInstanceModel };
