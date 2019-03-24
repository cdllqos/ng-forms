import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AddressComponent } from './components/address/address.component';
import { FormComponent } from './components/form/form.component';
import { InputComponent } from './components/input/input.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { PanelComponent } from './components/panel/panel.component';
import { SelectListComponent } from './components/select-list/select-list.component';
import { SelectComponent } from './components/select/select.component';
import { ComponentService } from './service/component.service';
import { PanelService } from './service/panel.service';
import { StartupService } from './service/startup.service';

@NgModule({
  declarations: [
    FormComponent,
    InputComponent,
    SelectComponent,
    PanelComponent,
    ListItemComponent,
    SelectListComponent,
    AddressComponent
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
    AddressComponent
  ]
})
export class LtFormModule {
  constructor(private startupService: StartupService) {
    this.startupService.startup();
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LtFormModule,
      providers: []
    };
  }
}
