import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-sidebar',
  imports: [TranslateModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  currentLang = 'ar'; // Default language
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();
}
