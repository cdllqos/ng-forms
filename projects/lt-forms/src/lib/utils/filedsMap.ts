import { InputComponent } from '../components/input/input.component';

const filedMap = [
  {
    type: 'input',
    compoent: InputComponent,
  },
];

const FindFiledByTypeName = (typeName: string) => {
  const selected = filedMap.find((m) => m.type === typeName);
  if (selected) {
    return selected.compoent;
  }
  return filedMap[0].compoent;
};
export { FindFiledByTypeName };
