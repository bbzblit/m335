import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.ynnk.taps',
  appName: 'Taps',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
