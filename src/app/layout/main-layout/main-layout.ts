import { Component, OnInit, HostListener } from '@angular/core';
import { HeaderComponent } from '../header/header';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, Sidebar, Footer, RouterOutlet, CommonModule],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss'],
})
export class MainLayout implements OnInit {
  isSidebarCollapsed = false;
  sidebarVisible = false;
  isMobile = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 992; // Bootstrap lg breakpoint
    if (this.isMobile) {
      this.isSidebarCollapsed = true;
    } else {
      this.sidebarVisible = false;
      this.isSidebarCollapsed = false;
    }
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.sidebarVisible = !this.sidebarVisible;
    } else {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }


  closeSidebar() {
  if (this.isMobile) {
    this.sidebarVisible = false;
  }
}

}
