import { ValidationModel } from './validationModel';

interface FieldModel {
  key: string;
  type?: string;
  value?: any;
  validations?: Array<ValidationModel>;
}
class FieldInstanceModel {
  model: FieldModel;
}
export { FieldModel, FieldInstanceModel };
