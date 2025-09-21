import { Component, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Output() toggleSidebar = new EventEmitter<void>();

  languages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
  ];

  currentLang = 'en'; // الافتراضي
  constructor(private translateService: TranslateService) {}

  switchLanguage(lang: string) {
    this.currentLang = lang;
    this.translateService.use(lang);

    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }

  logout(){
    // هنا يمكنك إضافة منطق تسجيل الخروج
    localStorage.clear(); // على سبيل المثال، مسح بيانات المستخدم من التخزين المحلي
    console.log('Logging out...');
    // على سبيل المثال، إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
    window.location.href = '/login';

  }
}
