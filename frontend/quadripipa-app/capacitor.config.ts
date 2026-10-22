import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.axoraen.quadripipa',
  appName: 'QuadriPipa',
  webDir: 'dist/quadripipa-app/browser',
  plugins: {
    StatusBar: {
      style: 'LIGHT',
    },
  },
  server: {
    url: 'http://192.168.0.7:4200',
    cleartext: true,
  },
};

export default config;
