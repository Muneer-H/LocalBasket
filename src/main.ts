import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { App } from './app/app';
import {
  LucideAngularModule,
  Search,
  Store,
  Plus,
  Star,
  ShoppingCart,
  CircleX,
  Pencil,
} from 'lucide-angular';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { provideStore } from '@ngrx/store';
import { appReducer } from './app/store/app.reducer';
import { environment } from './environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      LucideAngularModule.pick({ Search, Store, Plus, Star, ShoppingCart, CircleX, Pencil })
    ),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(MatSnackBarModule),
    importProvidersFrom(MatDialogModule),
    provideStore({ app: appReducer }),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
};

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
