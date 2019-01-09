import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';

import {SelectItem} from '../../model/selectItem';
import {PanelService} from '../../service/panel.service';
import {BaseField} from '../baseField';
import {SelectListComponent} from '../select-list/select-list.component';

@Component({
  selector: 'lt-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent extends BaseField implements OnInit, OnDestroy {
  selectedChange$: Subscription;
  @Output() selectedChange: EventEmitter<any> = new EventEmitter<any>();
  private list: Array<SelectItem> = [];

  constructor(private panelService: PanelService) {
    super();
  }

  ngOnInit() {}

  showSelection() {
    const selectListRef = this.panelService.showPanel({
      content: SelectListComponent,
      props: {
        list: this.list,
        value: this.ctrl.value,
      },
    });
    if (!this.ctrl.dirty) {
      this.ctrl.markAsDirty();
    }
    this.selectedChange$ =
        selectListRef.instance.selectedChange.subscribe((val) => {
          if (val === undefined) {
            this.panelService.closePanel();
            return;
          }
          if (this.ctrl.value === val) {
            this.ctrl.setValue('');
          } else {
            this.ctrl.setValue(val);
          }
          this.selectedChange.emit(this.ctrl.value);
          this.panelService.closePanel();
        });
  }

  get selectedName() {
    if (this.list.length < 1) {
      return '';
    }
    const selectedItem = this.list.find((m) => m.value === this.ctrl.value);
    if (selectedItem) {
      return selectedItem.name;
    }
    return '';
  }

  build(context: SelectComponent) {
    if (this.model.options && this.model.options['list']) {
      this.list = this.model.options['list'].map((m) => {
        return {
          name: m['name'],
          value: m['value'],
        };
      });
    }
  }

  ngOnDestroy() {
    if (this.selectedChange$) {
      this.selectedChange$.unsubscribe();
    }
  }
}
