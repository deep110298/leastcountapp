import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.leastcountapp.app',
  appName: 'Least Count App',
  webDir: 'www',
  server: {
    url: 'https://leastcountapp.com',
    cleartext: false,
    // Shown when the WebView fails to load leastcountapp.com — without this,
    // a failed load (e.g. no network on a device that hasn't cached the app
    // yet) leaves a bare black screen instead of any message. Bundled into
    // the binary from www/offline.html, so it works with zero connectivity.
    errorPath: 'offline.html',
  },
};

export default config;
