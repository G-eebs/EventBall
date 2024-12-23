import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.netlify.eventball',
  appName: 'EventBall',
  webDir: 'dist/event-ball/browser',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"]
    }
  },
};

export default config;
