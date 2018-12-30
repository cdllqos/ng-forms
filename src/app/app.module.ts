import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LtFormModule } from 'lt-forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { registerServiceWoker } from 'src/utils/service-worker-util';
export function initServiceWorker(injector: Injector) {
  return () => registerServiceWoker(injector, 'ngsw-worker.js');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LtFormModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: false,
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initServiceWorker,
      deps: [Injector],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
