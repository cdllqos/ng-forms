import { TestBed, ComponentFixture } from '@angular/core/testing';

import { ComponentService } from './component.service';
import { Component, ViewChild, ViewContainerRef, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'lt-test-component',
  template: ``,
})
export class LtTestComponent {
  @Input() ltInput = '';
}

@Component({
  selector: 'lt-view-container',
  template: `
    <ng-container #viewContainer></ng-container>
  `,
})
export class LtViewContainerComponent {
  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
}

const clearNodes = () => {
  const testComponent = document.body.querySelectorAll('lt-test-component');
  testComponent.forEach((node) => {
    document.body.removeChild(node);
  });
  const viewContainerComponent = document.body.querySelectorAll('lt-view-container');
  viewContainerComponent.forEach((node) => {
    document.body.removeChild(node);
  });
};

describe('ComponentService', () => {
  let componentService: ComponentService;
  let viewContainerInstance: LtViewContainerComponent;
  let viewContainerEl: HTMLElement;
  let component: ComponentFixture<LtViewContainerComponent>;
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [LtTestComponent, LtViewContainerComponent],
      providers: [ComponentService],
    })
  );

  beforeEach(() => {
    TestBed.overrideModule(BrowserModule, {
      set: {
        entryComponents: [LtTestComponent],
      },
    });
    componentService = TestBed.get(ComponentService);
    component = TestBed.createComponent(LtViewContainerComponent);
    viewContainerInstance = component.componentInstance;
    viewContainerEl = component.nativeElement;
    clearNodes();
  });

  it('should be created', () => {
    const service: ComponentService = TestBed.get(ComponentService);
    expect(service).toBeTruthy();
  });

  it('should attach component view without view container', () => {
    componentService.attachView({
      component: LtTestComponent,
    });
    const queryResult = document.body.querySelector('lt-test-component');
    expect(queryResult).not.toBeNull();
  });

  it('should attach component view with view container', () => {
    componentService.attachView(
      {
        component: LtTestComponent,
      },
      viewContainerInstance.viewContainer
    );
    const queryResult = viewContainerEl.querySelector('lt-test-component');
    expect(queryResult).not.toBeNull();
  });

  it('should attach component view with Props but without view container', () => {
    const componentRef = componentService.attachView({
      component: LtTestComponent,
      props: {
        ltInput: 'hi lt test component',
      },
    });
    expect(componentRef.instance.ltInput).toBe('hi lt test component');
  });

  it('should attach component view with Props and view container', () => {
    const componentRef = componentService.attachView(
      {
        component: LtTestComponent,
        props: {
          ltInput: 'hi lt test component',
        },
      },
      viewContainerInstance.viewContainer
    );
    expect(componentRef.instance.ltInput).toBe('hi lt test component');
  });

  it('should detach component view without view container', () => {
    const componentRef = componentService.attachView({
      component: LtTestComponent,
    });
    const queryResult = document.body.querySelector('lt-test-component');
    expect(queryResult).not.toBeNull();
    componentService.detachView(componentRef);
    const queryResult1 = document.body.querySelector('lt-test-component');
    expect(queryResult1).toBeNull();
  });

  it('should detach component view with view container', () => {
    const componentRef = componentService.attachView(
      {
        component: LtTestComponent,
      },
      viewContainerInstance.viewContainer
    );
    const queryResult = document.body.querySelector('lt-test-component');
    expect(queryResult).not.toBeNull();
    componentService.detachView(componentRef, viewContainerInstance.viewContainer);
    const queryResult1 = document.body.querySelector('lt-test-component');
    expect(queryResult1).toBeNull();
  });
});
