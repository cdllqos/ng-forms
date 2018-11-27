import { Type } from '@angular/core';

interface ComponentModel<
  T,
  P extends {
    [key: string]: any;
  }
> {
  component: Type<T>;
  props?: P;
}
export { ComponentModel };
