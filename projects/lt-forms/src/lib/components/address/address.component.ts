import {Component, OnInit} from '@angular/core';

import {FieldModel} from '../../model';
import {SelectItem} from '../../model/selectItem';
import {BaseField} from '../baseField';

import {area} from './area';
import {city} from './city';
import {province} from './province';


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
  constructor() {
    super();
  }

  ngOnInit() {
    this.provinceList = province.map(m => {
      return {name: m.name, value: m.id};
    });
    this.cityList = city[this.provinceList[0].value].map(m => {
      return {name: m.name, value: m.id};
    });
    this.areaList = area[this.cityList[0].value].map(m => {
      return {name: m.name, value: m.id};
    });
    this.buildSelectList();
  }

  buildSelectList() {
    this.provinceModel =
        this.buildFieldModel('province', '省', this.provinceList);

    this.cityModel = this.buildFieldModel('city', '城市', this.cityList);

    this.areaModel = this.buildFieldModel('area', '区县', this.areaList);
  }

  onProvinceChange(provinceId) {
    if (!provinceId) {
      return;
    }
    this.cityList = city[provinceId].map(m => {
      return {name: m.name, value: m.id};
    });
    this.cityModel = this.buildFieldModel('city', '城市', this.cityList);
    this.onCityChange(this.cityList[0].value);
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
}
