import { ValidatorFn, AbstractControlOptions } from '@angular/forms';

class FiledModel {
  constructor() {}
}
interface FiledModel {
  key: string;
  type?: string;
  value?: any;
  validations?: ValidatorFn | ValidatorFn[] | AbstractControlOptions;
}
class FiledInstanceModel {
  model: FiledModel;
}
export { FiledModel, FiledInstanceModel };
