import { HostListener, Output, EventEmitter, Input } from '@angular/core';
import { Component, OnInit, TemplateRef, ContentChild } from '@angular/core';

@Component({
  selector: 'lt-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() value: string;

  @Output() selectedChange: EventEmitter<string> = new EventEmitter<string>();

  @ContentChild('start') start: TemplateRef<any>;
  @ContentChild('end') end: TemplateRef<any>;

  constructor() {}

  ngOnInit() {}

  @HostListener('click')
  clickEmitter() {
    this.selectedChange.emit(this.value);
  }
}
