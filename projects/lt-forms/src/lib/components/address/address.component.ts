import {Component, OnInit} from '@angular/core';

import {FieldModel} from '../../model';
import {SelectItem} from '../../model/selectItem';
import {BaseField} from '../baseField';

import {area} from './area';
import {city} from './city';
import {province} from './province';

const emptyData = [{name: '暂无数据'}];

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

  adressVal: SelectItem;
  constructor() {
    super();
  }

  ngOnInit() {
    this.provinceList = province.map(m => {
      return {name: m.name, value: m.id};
    });
    this.buildSelectList();
  }

  buildSelectList() {
    this.provinceModel =
        this.buildFieldModel('province', '省', this.provinceList);
    this.cityModel = this.buildFieldModel('city', '城市', emptyData);
    this.areaModel = this.buildFieldModel('area', '区县', emptyData);
  }

  onProvinceChange(provinceId) {
    if (!provinceId) {
      return;
    }
    this.cityList = city[provinceId].map(m => {
      return {name: m.name, value: m.id};
    });
    this.cityModel = this.buildFieldModel('city', '城市', this.cityList);
    this.areaModel = this.buildFieldModel('area', '区县', emptyData);
  }

  onCityChange(cityId) {
    if (!cityId) {
      return;
    }
    this.areaList = area[cityId].map(m => {
      return {name: m.name, value: m.id};
    });
    this.areaModel = this.buildFieldModel('area', '区县', this.areaList);
  }

  onAreaChange(areaId) {}

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

  private setFieldVal() {}
}
