import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { InputComponent } from './components/input/input.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [FormComponent, InputComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule, FormComponent],
  entryComponents: [FormComponent, InputComponent],
})
export class LtFormModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LtFormModule,
      providers: [],
    };
  }
}
