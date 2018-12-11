import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewContainerRef,
  ViewChild,
  Input,
  ComponentRef,
  ViewEncapsulation,
} from '@angular/core';
import { ComponentService } from '../../service/component.service';
import { FieldInstanceModel, FieldModel } from '../../model/fieldModel';
import { BaseField } from '../baseField';
import { FindFiledByTypeName } from '../../utils/filedsMap';

@Component({
  selector: 'lt-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormComponent implements OnInit {
  private innerFields: Array<FieldModel>;
  private fieldRefs: Array<ComponentRef<BaseField>> = [];

  @Input()
  get ltFields(): Array<FieldModel> {
    return this.innerFields;
  }
  set ltFields(fields: Array<FieldModel>) {
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
  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;

  constructor(private componentService: ComponentService) {}

  ngOnInit() {}

  private buildFiledComponents() {
    this.innerFields.forEach((filed) => {
      const component = FindFiledByTypeName(filed.type);
      const componentRef = this.componentService.attachView<BaseField, FieldInstanceModel>(
        {
          component: component,
          props: {
            model: {
              ...filed,
            },
          },
        },
        this.viewContainer
      );
      this.fieldRefs.push(componentRef);
    });
  }

  get hasValid() {
    return this.fieldRefs.every((field) => field.instance.hasValid === true);
  }

  submit() {
    if (!this.hasValid) {
      this.ltSubmit.emit('error');
    }
    const result = {};
    this.fieldRefs.forEach((field) => {
      result[field.instance.model.key] = field.instance.ctrl.value;
    });
    this.ltSubmit.emit(result);
  }
}
