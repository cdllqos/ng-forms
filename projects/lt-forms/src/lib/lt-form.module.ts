import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { PanelComponent } from './components/panel/panel.component';
import { ComponentService } from './service/component.service';
import { PanelService } from './service/panel.service';

@NgModule({
  declarations: [FormComponent, InputComponent, SelectComponent, PanelComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ComponentService, PanelService],
  exports: [ReactiveFormsModule, FormComponent],
  entryComponents: [FormComponent, InputComponent, SelectComponent, PanelComponent],
})
export class LtFormModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LtFormModule,
      providers: [],
    };
  }
}
