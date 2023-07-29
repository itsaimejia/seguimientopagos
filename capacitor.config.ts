import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.donato.seguimientopagos',
  appName: 'Seguimiento Pagos',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
