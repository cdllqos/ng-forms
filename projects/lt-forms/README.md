# NgForms

this project is for dynamic create form field

### goal

- support create form field by passing a config object

- support input, select, radio,checkbox ... filed

- support angular original validations

### implemented

- input component

- select component

- address component

## Installation

```bash
# npm install
npm i lt-forms -S

# yarn install
yarn add lt-forms
```

## Usage

1. import { LtFormModule } from 'lt-forms';

```typescript
import { LtFormModule } from 'lt-forms';

@NgModule({
  declarations: [...],
  imports: [LtFormModule.forRoot(),...],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

2. use lt-forms in your component

```html
<lt-form #ltForm [ltFields]="fileds" (ltSubmit)="onSubmit($event)"></lt-form>
```

```typescript
@Component({
  ...
})
export class AppComponent {
  constructor() {}
  fileds: Array<FieldModel> = [
    {
      key: 'username',
      type: 'input',
      label: '文本',
      validations:
          [
            {
              name: LtValidations.Required,
              args: null,
              formatError: () => '请填写此字段',
            },
          ],
      valueChange:
          (value) => {
            console.log('value has changed:', value);
          },
    },
    {
      key: 'phone',
      type: 'input',
      label: '手机',
      validations:
          [
            {
              name: LtValidations.Phone,
              formatError:
                  (arg) => {
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
      validations:
          [
            {
              name: LtValidations.Required,
              args: null,
              formatError:
                  () => {
                    return '请填写密码';
                  },
            },
          ],
    },
    {
      key: 'email',
      type: 'input',
      label: '邮箱',
      validations:
          [
            {
              name: LtValidations.Email,
              args: null,
              formatError:
                  () => {
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
        list: [{name: '选项1', value: '111'}, {name: '选项2', value: '222'}],
      },
      validations:
          [
            {
              name: LtValidations.Required,
              args: null,
              formatError:
                  () => {
                    return '请选择一个选项';
                  },
            },
          ],
      valueChange:
          (value) => {
            console.log('value has changed:', value);
          },
    },
    {key: 'adress', type: 'address'}
  ];
  onSubmit(e) {
    console.table(e);
  }
}
```
