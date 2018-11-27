import { Component, OnInit, Output, EventEmitter, ElementRef, ViewContainerRef, ViewChild, Input } from '@angular/core';
import { ComponentService } from '../../service/component.service';
import { InputComponent } from '../input/input.component';
import { FiledInstanceModel, FiledModel } from '../../model/filedModel';

@Component({
  selector: 'lt-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() ltFiled: Array<FiledModel>;
  @Output() ltSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;

  constructor(private componentService: ComponentService) {}

  ngOnInit() {}
}
