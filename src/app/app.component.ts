import { Component } from '@angular/core';

import { FieldModel } from 'lt-forms';
@Component({
  selector: 'lt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {}
  fileds: Array<FieldModel> = [{ key: 'name', type: 'input', value: 1112 }];
  onSubmit(e) {
    console.log(e);
  }
}
