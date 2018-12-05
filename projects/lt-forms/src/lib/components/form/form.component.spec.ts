import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { BrowserModule } from '@angular/platform-browser';
import { InputComponent } from '../input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
describe('form Component', () => {
  let componentInstance: FormComponent;
  let fixtrue: ComponentFixture<FormComponent>;
  let formComponentEl: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [FormComponent, InputComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(async () => {
    TestBed.overrideModule(BrowserModule, {
      set: {
        entryComponents: [InputComponent],
      },
    });
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
        type: 'input',
      },
    ];
    fixtrue.detectChanges();
    const queryResult = formComponentEl.querySelector('lt-input');
    expect(queryResult).not.toBeNull();
  });
});
