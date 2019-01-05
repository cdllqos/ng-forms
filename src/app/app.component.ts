import { Component } from '@angular/core';

import { FieldModel, LtValidations } from 'lt-forms';
@Component({
  selector: 'lt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {}
  fileds: Array<FieldModel> = [
    {
      key: 'username',
      type: 'input',
      label: '文本',
      validations: [
        {
          name: LtValidations.Required,
          args: null,
          formatError: () => '请填写此字段',
        },
      ],
      valueChange: (value) => {
        console.log('value has changed:', value);
      },
    },
    {
      key: 'phone',
      type: 'input',
      label: '手机',
      validations: [
        {
          name: LtValidations.Phone,
          formatError: (arg) => {
            return '请填写手机号码';
          },
        },
      ],
    },
    {
      key: 'password',
      type: 'input',
      label: '密码',
      options: {
        type: 'password',
      },
      validations: [
        {
          name: LtValidations.Required,
          args: null,
          formatError: () => {
            return '请填写密码';
          },
        },
      ],
    },
    {
      key: 'email',
      type: 'input',
      label: '邮箱',
      validations: [
        {
          name: LtValidations.Email,
          args: null,
          formatError: () => {
            return '请输入一个邮箱';
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
      validations: [
        {
          name: LtValidations.Required,
          args: null,
          formatError: () => {
            return '请选择一个选项';
          },
        },
      ],
      valueChange: (value) => {
        console.log('value has changed:', value);
      },
    },
  ];
  onSubmit(e) {
    console.table(e);
  }
}
