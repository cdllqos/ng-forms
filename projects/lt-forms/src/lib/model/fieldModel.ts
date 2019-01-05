import { ValidationModel } from './validationModel';

interface FieldModel {
  key: string;
  label?: string;
  type?: string;
  value?: any;
  validations?: Array<ValidationModel>;
  options?: any;
  valueChange?: (value: any) => void;
}
class FieldInstanceModel {
  model: FieldModel;
}
export { FieldModel, FieldInstanceModel };
