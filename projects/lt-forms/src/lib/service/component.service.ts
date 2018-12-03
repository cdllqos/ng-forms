import {
  Injectable,
  ApplicationRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
  Injector,
} from '@angular/core';
import { ComponentModel } from '../model/componentModel';

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  constructor(private appRef: ApplicationRef, private crf: ComponentFactoryResolver, private injector: Injector) {}

  attachView<T, P>(componentModel: ComponentModel<T, P>, viewContainer?: ViewContainerRef): ComponentRef<T> {
    let componentRef: ComponentRef<T>;
    const componentFactory = this.crf.resolveComponentFactory(componentModel.component);
    if (viewContainer) {
      componentRef = viewContainer.createComponent(componentFactory);
    } else {
      componentRef = componentFactory.create(this.injector);
    }
    if (componentModel.props) {
      this.setProps<T>(componentRef.instance, componentModel.props);
    }
    componentRef.changeDetectorRef.detectChanges();
    if (!viewContainer) {
      this.appRef.attachView(componentRef.hostView);
      document.body.appendChild(componentRef.location.nativeElement);
    }
    return componentRef;
  }

  detachView(componentRef: ComponentRef<any>, viewContainer?: ViewContainerRef) {
    if (!viewContainer) {
      this.appRef.detachView(componentRef.hostView);
      return;
    }
    const elIndex = viewContainer.indexOf(componentRef.hostView);
    if (elIndex > -1) {
      viewContainer.remove(elIndex);
    }
  }

  private setProps<T>(instance: T, props: { [key: string]: any }) {
    Object.keys(props).forEach((key) => {
      instance[key] = props[key];
    });
  }
}
