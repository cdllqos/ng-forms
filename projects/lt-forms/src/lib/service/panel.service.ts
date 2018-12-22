import { Injectable, ComponentRef } from '@angular/core';
import { ComponentService } from './component.service';
import { PanelModel } from '../model/panelModel';
import { PanelComponent } from '../components/panel/panel.component';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: null,
})
export class PanelService {
  private panelRef: ComponentRef<PanelComponent>;
  private closeSubscription$: Subscription;

  constructor(private componentService: ComponentService) {}

  showPanel(option: PanelModel) {
    this.panelRef = this.componentService.attachView({
      component: PanelComponent,
      props: {
        position: option.position ? option.position : 'bottom',
        showMask: option.showMask === false ? false : true,
      },
    });
    this.closeSubscription$ = this.panelRef.instance.close.subscribe(() => {
      this.closePanel();
    });
    const viewContainer = this.panelRef.instance.viewContainer;
    this.componentService.attachView(
      {
        component: option.content,
      },
      viewContainer
    );
  }

  closePanel() {
    if (this.panelRef) {
      this.componentService.detachView(this.panelRef);
      this.closeSubscription$.unsubscribe();
    }
  }
}
