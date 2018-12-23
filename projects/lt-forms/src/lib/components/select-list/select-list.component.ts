import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListItemModel } from '../../model/listItem';

@Component({
  selector: 'lt-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss'],
})
export class SelectListComponent implements OnInit {
  @Input() list: Array<ListItemModel>;
  @Input() value: string;
  @Output() selectedChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  itemChange(val: string) {
    this.selectedChange.emit(val);
  }
}
