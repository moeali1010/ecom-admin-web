//
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const translate = inject(TranslateService);
  const snackBar = inject(MatSnackBar);

  // 🔹1) إضافة Accept-Language في كل request
  const lang = translate.currentLang || 'en';
  const langReq = req.clone({
    setHeaders: {
      'Accept-Language': lang,
    },
  });

  // 🔹2) معالجة الأخطاء
  return next(langReq).pipe(
    catchError((error) => {
      let message = '';

      if (error.error && error.error.message) {
        // الرسالة مترجمة من الـ Backend
        message = error.error.message;
      } else {
        // fallback: رسالة عامة من Angular i18n
        message = translate.instant('unknown_error');
      }

      // عرض الرسالة في الـ Snackbar
      snackBar.open(message,'', {
        panelClass: ['snackbar-error'], 
      });

      return throwError(() => error);
    })
  );
};
