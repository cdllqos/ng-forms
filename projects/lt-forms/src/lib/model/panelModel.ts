import { Type } from '@angular/core';

export class PanelModel {
  position?: 'top' | 'bottom' = 'bottom';
  content?: Type<any>;
  showMask?: boolean = true;
}
