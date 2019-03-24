import { Injectable, ComponentRef } from '@angular/core';
import { ComponentService } from './component.service';
import { PanelModel } from '../model/panelModel';
import { PanelComponent } from '../components/panel/panel.component';
import { Subscription } from 'rxjs';

@Injectable()
export class PanelService {
  private panelRef: ComponentRef<PanelComponent>;
  private closeSubscription$: Subscription;

  constructor(private componentService: ComponentService) {}

  showPanel<T>(option: PanelModel<T>): ComponentRef<T> {
    this.panelRef = this.componentService.attachView({
      component: PanelComponent,
      props: {
        position: option.position ? option.position : 'bottom',
        showMask: option.showMask === false ? false : true
      }
    });
    this.closeSubscription$ = this.panelRef.instance.close.subscribe(() => {
      this.closePanel();
    });
    const viewContainer = this.panelRef.instance.viewContainer;
    const contentRef = this.componentService.attachView(
      {
        component: option.content,
        props: option.props
      },
      viewContainer
    );
    return contentRef;
  }

  closePanel() {
    if (this.panelRef) {
      this.componentService.detachView(this.panelRef);
    }
    if (this.closeSubscription$) {
      this.closeSubscription$.unsubscribe();
    }
  }
}
