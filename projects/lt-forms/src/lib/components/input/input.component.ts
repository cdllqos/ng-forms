import { Component, OnInit } from '@angular/core';
import { BaseField } from '../baseField';

@Component({
  selector: 'lt-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent extends BaseField implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}

  get type() {
    if (!this.model.options) {
      return 'text';
    }
    if (!this.model.options['type']) {
      return 'text';
    }
    return this.model.options['type'];
  }
}
