import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { PanelComponent } from './components/panel/panel.component';
import { ComponentService } from './service/component.service';
import { PanelService } from './service/panel.service';
import { ListItemComponent } from './components/list-item/list-item.component';
import { SelectListComponent } from './components/select-list/select-list.component';

@NgModule({
  declarations: [
    FormComponent,
    InputComponent,
    SelectComponent,
    PanelComponent,
    ListItemComponent,
    SelectListComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ComponentService, PanelService],
  exports: [ReactiveFormsModule, FormComponent],
  entryComponents: [
    FormComponent,
    InputComponent,
    SelectComponent,
    PanelComponent,
    ListItemComponent,
    SelectListComponent,
  ],
})
export class LtFormModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LtFormModule,
      providers: [],
    };
  }
}
