import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LtFormModule } from 'lt-forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { shouldEnableServiceWorker } from '../utils/service-worker-util';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LtFormModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: shouldEnableServiceWorker() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
