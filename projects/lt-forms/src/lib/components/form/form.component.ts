import {ChangeDetectionStrategy, Component, ComponentRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef, ViewEncapsulation,} from '@angular/core';

import {FieldInstanceModel, FieldModel} from '../../model/fieldModel';
import {ComponentService} from '../../service/component.service';
import {FindFiledByTypeName} from '../../utils/filedsMap';
import {BaseField} from '../baseField';

@Component({
  selector: 'lt-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  private innerFields: Array<FieldModel>;
  private fieldRefs: Array<ComponentRef<BaseField>> = [];

  @Input()
  get ltFields(): Array<FieldModel> {
    return this.innerFields;
  }
  set ltFields(fields: Array<FieldModel>) {
    console.log('fields', fields);
    if (!fields) {
      console.warn(`please use ltField like this:
      <lt-form [ltFields]="fields"></lt-form>`);
      return;
    }
    if (this.fieldRefs.length > 0) {
      this.fieldRefs.splice(0, this.fieldRefs.length);
    }
    this.innerFields = fields;
    this.buildFiledComponents();
  }
  @Output() ltSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('viewContainer', {read: ViewContainerRef})
  viewContainer: ViewContainerRef;

  constructor(private componentService: ComponentService) {}

  ngOnInit() {}

  private buildFiledComponents() {
    this.innerFields.forEach((field) => {
      const component = FindFiledByTypeName(field.type);
      const componentRef =
          this.componentService.attachView<BaseField, FieldInstanceModel>(
              {
                component: component,
                props: {
                  model: {
                    ...field,
                  },
                },
              },
              this.viewContainer);
      this.fieldRefs.push(componentRef);
    });
  }

  get hasValid() {
    return this.fieldRefs.every((field) => field.instance.canSubmit === true);
  }

  submit() {
    if (!this.hasValid) {
      this.fieldRefs.forEach((field) => {
        if (!field.instance.ctrl.dirty) {
          field.instance.ctrl.markAsDirty();
        }
      });
      this.ltSubmit.emit({error: `can't submit form`});
      return;
    }
    const result = {};
    this.fieldRefs.forEach((field) => {
      result[field.instance.model.key] = field.instance.ctrl.value;
    });
    this.ltSubmit.emit(result);
  }
}
