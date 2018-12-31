import { environment } from '../environments/environment';
import { Injector, ApplicationRef } from '@angular/core';
import { filter, take } from 'rxjs/operators';
const unRegisterServicerWorker = () => {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((reg) => {
      reg.unregister();
    });
  });
};
const shouldRegisterServiceWorker = (): boolean => {
  if (!environment.production) {
    return false;
  }
  if (!navigator.serviceWorker) {
    return false;
  }
  const userAgent = navigator.userAgent.toLowerCase();
  if (/qqbrowser/.test(userAgent) || /mzbrowser/.test(userAgent)) {
    return false;
  }
  if (/iphone/.test(userAgent) || /chrome/.test(userAgent)) {
    return true;
  }
  return false;
};
const registerServiceWoker = (injector: Injector, scriptName: string) => {
  if (!shouldRegisterServiceWorker) {
    unRegisterServicerWorker();
    return;
  }
  const app = injector.get<ApplicationRef>(ApplicationRef);
  const whenStable = app.isStable
    .pipe(
      filter((stable: boolean) => !!stable),
      take(1)
    )
    .toPromise();
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (navigator.serviceWorker.controller !== null) {
      navigator.serviceWorker.controller.postMessage({ action: 'INITIALIZE' });
    }
  });
  whenStable.then(() => navigator.serviceWorker.register(scriptName));
};
export { registerServiceWoker };
