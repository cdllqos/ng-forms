import {Type} from '@angular/core';

import {AddressComponent} from '../components/address/address.component';
import {InputComponent} from '../components/input/input.component';
import {SelectComponent} from '../components/select/select.component';

const initFieldMap = () => {
  const map: Map<string, Type<any>> = new Map();
  map.set('input', InputComponent);
  map.set('select', SelectComponent);
  map.set('address', AddressComponent);
  return map;
};

const fieldMap: Map<string, Type<any>> = initFieldMap();

const FindFiledByTypeName = (typeName: string) => {
  const selectedComponent = fieldMap.get(typeName);
  if (selectedComponent) {
    return selectedComponent;
  }
  return fieldMap.get('input');
};
export {FindFiledByTypeName};
