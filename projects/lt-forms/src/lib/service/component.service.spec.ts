import { TestBed, ComponentFixture } from '@angular/core/testing';

import { ComponentService } from './component.service';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'lt-test-component',
  template: ``,
})
export class LtTestComponent {}
@Component({
  selector: 'lt-view-container',
  template: `
    <ng-container #viewContainer></ng-container>
  `,
})
export class LtViewContainerComponent {
  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
}

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
  });

  it('should be created', () => {
    const service: ComponentService = TestBed.get(ComponentService);
    expect(service).toBeTruthy();
  });

  it('should attach component view without view container', () => {
    componentService.attachView({
      component: LtTestComponent,
    });
    const queryResult = document.querySelector('lt-test-component');
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
});
