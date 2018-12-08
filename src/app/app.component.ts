import { Component } from '@angular/core';

import { FieldModel } from 'lt-forms';
@Component({
  selector: 'lt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {}
  fileds: Array<FieldModel> = [
    {
      key: 'name',
      type: 'input',
      label: '姓名',
      value: 12,
      validations: [
        {
          name: 'required',
          args: null,
          formatError: () => '请填写此字段',
        },
        {
          name: 'minlength',
          args: 3,
          formatError: (error) => {
            return `请填写至少${error.requiredLength}个字符，当前已填写${error.actualLength}个字符`;
          },
        },
      ],
    },
  ];
  onSubmit(e) {
    console.log(e);
  }
}
