import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseField } from '../baseField';
import { PanelService } from '../../service/panel.service';
import { SelectListComponent } from '../select-list/select-list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lt-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent extends BaseField implements OnInit, OnDestroy {
  selectedChange$: Subscription;
  private list: Array<{ name?: string; value?: string }> = [];

  constructor(private panelService: PanelService) {
    super();
  }

  ngOnInit() {
    if (this.model.options && this.model.options['list']) {
      this.list = this.model.options['list'].map((m) => {
        return {
          name: m['name'],
          value: m['value'],
        };
      });
    }
  }

  showSelection() {
    const selectListRef = this.panelService.showPanel({
      content: SelectListComponent,
      props: {
        list: this.list,
      },
    });
    this.selectedChange$ = selectListRef.instance.selectedChange.subscribe((val) => {
      if (this.ctrl.value === val) {
        this.ctrl.setValue('');
      } else {
        this.ctrl.setValue(val);
      }
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

  ngOnDestroy() {
    if (this.selectedChange$) {
      this.selectedChange$.unsubscribe();
    }
  }
}
