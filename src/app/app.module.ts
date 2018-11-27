import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LtFormModule } from '../../projects/lt-forms/src/lib/lt-form.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LtFormModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
