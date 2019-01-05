import { Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getValidations } from '../validations';
import { FieldModel, FieldValidator } from '../model';
import { debounceTime } from 'rxjs/operators';
class BaseField {
  private innerModel: FieldModel;
  @Input()
  get model(): FieldModel {
    return this.innerModel;
  }
  set model(val: FieldModel) {
    if (val) {
      this.innerModel = val;
      this.setCtrl(val);
    }
  }

  ctrl: FormControl;

  private setCtrl(fieldModel: FieldModel) {
    let validations: FieldValidator;
    if (fieldModel.validations) {
      validations = getValidations(fieldModel.validations);
    }
    this.ctrl = new FormControl(fieldModel.value, validations);
    if (fieldModel.valueChange) {
      this.ctrl.valueChanges.pipe(debounceTime(100)).subscribe((value) => {
        fieldModel.valueChange(value);
      });
    }
  }

  get hasValid(): boolean {
    if (!this.ctrl || !this.ctrl.dirty) {
      return true;
    }
    return this.ctrl.status === 'VALID';
  }

  get canSubmit(): boolean {
    if (!this.ctrl) {
      return true;
    }
    return this.ctrl.status === 'VALID';
  }

  getError(code: string) {
    if (!this.ctrl || !this.model || !this.ctrl.dirty) {
      return false;
    }
    const ctrlError = this.ctrl.getError(code);
    const validationError = this.getValidation(code);
    if (!ctrlError) {
      return false;
    }
    if (ctrlError && !(validationError && validationError.formatError)) {
      return '此字段填写有误';
    }
    return validationError.formatError(ctrlError);
  }

  getValidation(code: string) {
    if (!this.model || !this.model.validations) {
      return null;
    }
    const validation = this.model.validations.find((m) => m.name === code);
    return validation;
  }
}
export { BaseField };
