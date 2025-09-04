// import { Component } from '@angular/core';
// import { Header } from '../header/header';
// import { Sidebar } from '../sidebar/sidebar';
// import { Footer } from '../footer/footer';
// import { RouterOutlet } from '@angular/router';
// @Component({
//   selector: 'app-main-layout',
//   imports: [Header, Sidebar, Footer, RouterOutlet],
//   templateUrl: './main-layout.html',
//   styleUrl: './main-layout.scss',
// })
// export class MainLayout {
//   // الحالة (مفتوح/مقفول)
//   isSidebarCollapsed = false;

//   // ميثود للتبديل
//   toggleSidebar() {
//     this.isSidebarCollapsed = !this.isSidebarCollapsed;
//   }
// }

import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true, // 👈 لازم
  imports: [Header, Sidebar, Footer, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'], // 👈 خليها styleUrls
})
export class MainLayout {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
