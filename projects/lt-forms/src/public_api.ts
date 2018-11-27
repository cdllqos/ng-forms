import { NgElement, WithProperties } from '@angular/elements';
import { FiledModel } from './lib/model/filedModel';

/*
 * Public API Surface of lt-forms
 */
type FiledType = NgElement & WithProperties<{ model: FiledModel }>;
declare global {
  interface HTMLElementTagNameMap {
    'lt-form': NgElement & WithProperties<{}>;
    'lt-input': NgElement & WithProperties<{ model: FiledModel }>;
  }
}

export * from './lib/lt-form.module';
