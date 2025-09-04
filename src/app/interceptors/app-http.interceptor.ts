import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import ar from '../../../public/i18n/ar.json';
import en from '../../../public/i18n/en.json';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private translateService: TranslateService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const lang = this.translateService.getCurrentLang() || 'en';
    const translations = lang === 'ar' ? ar : en;
    const clonedReq = req.clone({
      setHeaders: {
        'Accept-Language': lang,
      },
    });
    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        switch (error.status) {
          case 404:
            errorMsg = translations.not_found;
            break;
          case 500:
            errorMsg = translations.server_error;
            break;
          default:
            errorMsg = translations.general_error;
        }
        alert(errorMsg);
        return throwError(() => error);
      })
    );
  }
}
