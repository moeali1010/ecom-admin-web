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
}
