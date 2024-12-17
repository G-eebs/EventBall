import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from './errors/interceptors/http-error.interceptor';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
    provideFirebaseApp(() => initializeApp({ 
      apiKey: "AIzaSyC33dQ8l8VvWKl5lpf8E2riLlcZM86y0Ig",
      authDomain: "eventball-cba3e.firebaseapp.com",
      projectId: "eventball-cba3e",
      storageBucket: "eventball-cba3e.firebasestorage.app",
      messagingSenderId: "419477307077",
      appId: "1:419477307077:web:e6180d61dba932cbdefaac"
     })),
    provideAuth(() => getAuth()),
  ]
};
