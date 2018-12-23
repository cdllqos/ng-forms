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
        {
          name: 'phone',
          formatError: (error) => {
            return '请填写一个有效手机号码';
          },
        },
      ],
    },
    {
      key: 'select',
      type: 'select',
      label: '选择器',
      options: {
        list: [{ name: '选项1', value: '111' }, { name: '选项2', value: '222' }],
      },
    },
  ];
  onSubmit(e) {
    console.table(e);
  }
}
