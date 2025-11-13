import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  inject
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { appInterceptor } from './interceptors/app-http.interceptor';

console.log('app.config.ts loaded');

export const appConfig: ApplicationConfig = {
  providers: [
    // HttpClient مع Interceptors
    provideHttpClient(
      withFetch(),
      withInterceptors([appInterceptor])
    ),

    // Angular Global Error Listeners
    provideBrowserGlobalErrorListeners(),

    // Zoneless change detection
    provideZonelessChangeDetection(),

    // Router
    provideRouter(routes),

    // Hydration
    provideClientHydration(withEventReplay()),

    // ngx-translate
    provideTranslateService({
      lang: 'ar',               // اللغة الافتراضية
      fallbackLang: 'en',       // لغة احتياطية
      useDefaultLang: true,     // يفرض استخدام اللغة الافتراضية
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',       // public/i18n/
        suffix: '.json',
      }),
    }),

    // Animations
    provideAnimationsAsync(),

    // Angular Material Snackbar defaults
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      },
    },
  ],
};
