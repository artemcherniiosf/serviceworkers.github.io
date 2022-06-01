// Make sure service workers are supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_cached_site.js')
      .then((reg) => {
        console.log('Service worker registered', reg);
      })
      .catch((err) => `Service worker not registered: ${err}`);
  });
}
