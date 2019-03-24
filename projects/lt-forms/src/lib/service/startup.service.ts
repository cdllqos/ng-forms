import { Injectable } from '@angular/core';

import { initFieldMap } from '../utils/filedsMap';
import { initValidationMap } from '../validations';

@Injectable({ providedIn: 'root' })
export class StartupService {
  startup() {
    initValidationMap();
    initFieldMap();
  }
}
