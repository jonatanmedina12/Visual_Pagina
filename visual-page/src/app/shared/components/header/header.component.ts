import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  private router = inject(Router);
  
  protected readonly isMenuOpen = signal(false);
  protected readonly isScrolled = signal(false);

  protected readonly navItems = signal<NavItem[]>([
    { label: 'Inicio', route: '/home', icon: 'home' },
    { label: 'Servicios', route: '/services', icon: 'build' },
    { label: 'Portafolio', route: '/portfolio', icon: 'work' },
    { label: 'Sobre Nosotros', route: '/about', icon: 'people' },
    { label: 'Contacto', route: '/contact', icon: 'mail' },
  ]);

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 50);
      });
    }
  }

  toggleMenu() {
    this.isMenuOpen.update((value) => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
    this.closeMenu();
  }
}
