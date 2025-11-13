import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  languages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
  ];

  currentLang = 'en';

  constructor(private translateService: TranslateService) {
    // تعيين اللغة الافتراضية
    this.translateService.setDefaultLang(this.currentLang);
    this.applyDirection(this.currentLang);
  }

  switchLanguage(lang: string) {
    this.currentLang = lang;
    this.translateService.use(lang);
    this.applyDirection(lang);
  }

  

  private applyDirection(lang: string) {
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
  }

  logout() {
    localStorage.clear();
    console.log('Logging out...');
    window.location.href = '/login';
  }
}
