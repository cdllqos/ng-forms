import {Component, OnInit} from '@angular/core';

import {FieldModel} from '../../model';
import {SelectItem} from '../../model/selectItem';
import {BaseField} from '../baseField';

import {area} from './area';
import {city} from './city';
import {province} from './province';

const emptyData = [{name: '暂无数据'}];
const PROVINCE = 'province';
const CITY = 'city';
const AREA = 'area';

@Component({
  selector: 'lt-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent extends BaseField implements OnInit {
  provinceList: Array<SelectItem> = [];
  cityList: Array<SelectItem> = [];
  areaList: Array<SelectItem> = [];
  provinceModel: FieldModel;
  cityModel: FieldModel;
  areaModel: FieldModel;
  nameResultMap: Map<string, string> = new Map<string, string>();
  valueResultMap: Map<string, string> = new Map<string, string>();

  adressVal: SelectItem;
  constructor() {
    super();
  }

  ngOnInit() {
    this.provinceList = province.map(m => {
      return {name: m.name, value: m.id};
    });
    this.buildSelectList();
    this.initialVal();
  }

  buildSelectList() {
    this.provinceModel =
        this.buildFieldModel(PROVINCE, '省', this.provinceList);
    this.cityModel = this.buildFieldModel(CITY, '城市', emptyData);
    this.areaModel = this.buildFieldModel(AREA, '区县', emptyData);
  }

  onProvinceChange(provinceId) {
    const selectedProvince =
        this.provinceList.find(m => m.value === provinceId);
    if (!selectedProvince) {
      this.cityModel = this.buildFieldModel(CITY, '城市', emptyData);
      this.areaModel = this.buildFieldModel(AREA, '区县', emptyData);
      this.setFieldVal(PROVINCE, '', '');
      return;
    }
    this.setFieldVal(PROVINCE, selectedProvince.name, selectedProvince.value);
    this.cityList = city[provinceId].map(m => {
      return {name: m.name, value: m.id};
    });
    this.cityModel = this.buildFieldModel(CITY, '城市', this.cityList);
    this.areaModel = this.buildFieldModel(AREA, '区县', emptyData);
  }

  onCityChange(cityId) {
    const selectedCity = this.cityList.find(m => m.value === cityId);
    if (!selectedCity) {
      this.areaModel = this.buildFieldModel(AREA, '区县', this.areaList);
      this.setFieldVal(CITY, '', '');
      return;
    }
    this.setFieldVal(CITY, selectedCity.name, selectedCity.value);
    this.areaList = area[cityId].map(m => {
      return {name: m.name, value: m.id};
    });
    this.areaModel = this.buildFieldModel(AREA, '区县', this.areaList);
  }

  onAreaChange(areaId) {
    const selectedArea = this.areaList.find(m => m.value === areaId);
    if (!selectedArea) {
      this.setFieldVal(AREA, '', '');
      return;
    }
    this.setFieldVal(AREA, selectedArea.name, selectedArea.value);
  }

  private initialVal() {
    this.nameResultMap.set(PROVINCE, '');
    this.nameResultMap.set(CITY, '');
    this.nameResultMap.set(AREA, '');
    this.valueResultMap.set(PROVINCE, '');
    this.valueResultMap.set(CITY, '');
    this.valueResultMap.set(AREA, '');
  }

  private buildFieldModel(key: string, label: string, list: Array<SelectItem>):
      FieldModel {
    return {
      key: key,
      type: 'select',
      label: label,
      options: {
        list: list,
      }
    };
  }

  private setFieldVal(key: string, name: string, value: string) {
    switch (key) {
      case PROVINCE: {
        this.nameResultMap.set(PROVINCE, name);
        this.nameResultMap.set(CITY, '');
        this.nameResultMap.set(AREA, '');
        this.valueResultMap.set(PROVINCE, value);
        this.valueResultMap.set(CITY, '');
        this.valueResultMap.set(AREA, '');
        break;
      }
      case CITY: {
        this.nameResultMap.set(CITY, name);
        this.nameResultMap.set(AREA, '');
        this.valueResultMap.set(CITY, value);
        this.valueResultMap.set(AREA, '');
        break;
      }
      case AREA: {
        this.nameResultMap.set(AREA, name);
        this.valueResultMap.set(AREA, value);
        break;
      }
      default: { break; }
    }
    let resultName = '';
    let resultValue = '';
    this.nameResultMap.forEach((m) => {
      resultName += `${m}-`;
    });
    resultName = resultName.substring(0, resultName.length - 1);
    this.valueResultMap.forEach((m) => {
      resultValue += `${m}-`;
    });
    resultValue = resultValue.substring(0, resultValue.length - 1);
    this.ctrl.setValue({name: resultValue, value: resultValue});
  }
}
