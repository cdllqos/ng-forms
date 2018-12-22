import { InputComponent } from '../components/input/input.component';
import { Type } from '@angular/core';

const fieldMap: Map<string, Type<any>> = new Map();
fieldMap.set('input', InputComponent);

const FindFiledByTypeName = (typeName: string) => {
  const selectedComponent = fieldMap.get(typeName);
  if (selectedComponent) {
    return selectedComponent;
  }
  return fieldMap.get('input');
};
export { FindFiledByTypeName };
