import { Type } from '@angular/core';
import { InputComponent } from '../components/input/input.component';
import { SelectComponent } from '../components/select/select.component';

const fieldMap: Map<string, Type<any>> = new Map();
fieldMap.set('input', InputComponent);
fieldMap.set('select', SelectComponent);

const FindFiledByTypeName = (typeName: string) => {
  const selectedComponent = fieldMap.get(typeName);
  if (selectedComponent) {
    return selectedComponent;
  }
  return fieldMap.get('input');
};
export { FindFiledByTypeName };
