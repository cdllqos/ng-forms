import { Type } from '@angular/core';

export class PanelModel<T> {
  position?: 'top' | 'bottom' = 'bottom';
  content?: Type<T>;
  showMask?: boolean = true;
  props?: {
    [key: string]: any;
  };
}
