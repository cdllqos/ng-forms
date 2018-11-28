import { Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldModel } from '../model/fieldModel';
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
    this.ctrl = new FormControl(fieldModel.value, fieldModel.validations);
  }

  get hasValid(): boolean {
    if (!this.ctrl) {
      return true;
    }
    return this.ctrl.status === 'VALID';
  }

  getError(code: string) {
    if (!this.ctrl) {
      return false;
    }
    return this.ctrl.getError(code);
  }
}
export { BaseField };
