import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { environment } from '../environment';

export const appConfig: ApplicationConfig = {
  providers: [
    // Enable Routes
    provideRouter(routes), 
    provideClientHydration(),
    // Initialize Firebase
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // Provide Firebase Authentication
    provideAuth(() => getAuth()),
    // Provide HTTP requests
    provideHttpClient(withFetch())
  ]
};
