import { FiledModel } from '../model/filedModel';
import { Input } from '@angular/core';
import { FormControl } from '@angular/forms';
class BaseField {
  private innerModel: FiledModel;
  @Input()
  get model(): FiledModel {
    return this.innerModel;
  }
  set model(val: FiledModel) {
    if (val) {
      this.innerModel = val;
      this.setCtrl(val);
    }
  }

  ctrl: FormControl;

  private setCtrl(filedModel: FiledModel) {
    this.ctrl = new FormControl(filedModel.value, filedModel.validations);
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
