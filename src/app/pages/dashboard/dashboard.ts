import { Component, signal } from '@angular/core';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TranslateModule, TranslatePipe],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  protected readonly title = signal('ngx-translate-demo-standalone');
}
