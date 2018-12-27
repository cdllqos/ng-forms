import { Injectable } from '@angular/core';
import { initFieldMap } from '../utils/filedsMap';
import { initValidationMap } from '../validations';

@Injectable()
export class InitializationService {
  constructor() {}

  initialize() {
    initFieldMap();
    initValidationMap();
  }
}
