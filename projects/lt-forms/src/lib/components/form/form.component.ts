import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewContainerRef,
  ViewChild,
  Input,
  ComponentRef,
} from '@angular/core';
import { ComponentService } from '../../service/component.service';
import { FieldInstanceModel, FieldModel } from '../../model/fieldModel';
import { BaseField } from '../baseField';
import { FindFiledByTypeName } from '../../utils/filedsMap';

@Component({
  selector: 'lt-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() ltFields: Array<FieldModel>;
  @Output() ltSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;

  private fieldRefs: Array<ComponentRef<BaseField>> = [];

  constructor(private componentService: ComponentService) {}

  ngOnInit() {
    this.buildFiledComponents();
  }

  private buildFiledComponents() {
    if (!this.ltFields) {
      console.warn(`please use ltField like this:
      <lt-form [ltFields]="fields"></lt-form>`);
      return;
    }
    this.ltFields.forEach((filed) => {
      const component = FindFiledByTypeName(filed.type);
      const componentRef = this.componentService.attachView<BaseField, FieldInstanceModel>(
        {
          component: component,
          props: {
            model: {
              key: filed.key,
              type: filed.type,
              value: filed.value,
              validations: filed.validations,
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
