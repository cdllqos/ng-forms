import { environment } from '../environments/environment';
const unRegisterServicerWorker = () => {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((reg) => {
      reg.unregister();
    });
  });
};
const shouldEnableServiceWorker = (): boolean => {
  if (!environment.production) {
    return false;
  }
  if (!navigator.serviceWorker) {
    unRegisterServicerWorker();
    return false;
  }
  const userAgent = navigator.userAgent.toLowerCase();
  if (/iphone/.test(userAgent) || /chrome/.test(userAgent)) {
    return true;
  }
  unRegisterServicerWorker();
  return false;
};
export { shouldEnableServiceWorker };
