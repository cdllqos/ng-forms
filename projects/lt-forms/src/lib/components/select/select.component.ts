import { Component, OnInit } from '@angular/core';
import { BaseField } from '../baseField';
import { PanelService } from '../../service/panel.service';

@Component({
  selector: 'lt-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent extends BaseField implements OnInit {
  constructor(private panelService: PanelService) {
    super();
  }

  ngOnInit() {}

  hidePanel() {
    //this.panelService.closePanel();
  }
}
