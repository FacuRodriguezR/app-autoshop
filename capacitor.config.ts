import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.app.autoshop',
  appName: 'app-autoshop',
  webDir: 'www',plugins: {
    CapacitorHttp: {
      enabled: true
    },
    ios: {
    enableSignInWithApple: true
  }
  }
};

export default config;
