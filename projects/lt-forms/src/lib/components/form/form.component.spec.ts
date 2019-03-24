import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ComponentService, PanelService, StartupService } from '../../service';
import { InputComponent } from '../input/input.component';

import { FormComponent } from './form.component';

describe('form Component', () => {
  let componentInstance: FormComponent;
  let fixtrue: ComponentFixture<FormComponent>;
  let formComponentEl: HTMLElement;
  let startupService: StartupService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [FormComponent, InputComponent],
      imports: [ReactiveFormsModule],
      providers: [ComponentService, PanelService, StartupService]
    }).compileComponents();
  });

  beforeEach(async () => {
    TestBed.overrideModule(BrowserModule, {
      set: {
        entryComponents: [InputComponent]
      }
    });
    startupService = TestBed.get(StartupService);
    startupService.startup();
    fixtrue = TestBed.createComponent(FormComponent);
    componentInstance = fixtrue.componentInstance;
    componentInstance.ltFields = [];
    fixtrue.detectChanges();
    formComponentEl = fixtrue.nativeElement;
  });

  it('should create', () => {
    expect(componentInstance).toBeTruthy();
    expect(fixtrue).toBeTruthy();
    expect(formComponentEl).toBeTruthy();
  });

  it('should build field component by passing ltFields', () => {
    componentInstance.ltFields = [
      {
        key: 'name',
        type: 'input'
      }
    ];
    fixtrue.detectChanges();
    const queryResult = formComponentEl.shadowRoot.querySelector('lt-input');
    expect(queryResult).not.toBeNull();
  });
});
