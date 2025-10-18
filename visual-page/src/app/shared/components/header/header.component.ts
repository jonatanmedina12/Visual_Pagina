import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';

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
    MatDividerModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  private router = inject(Router);

  protected readonly isMenuOpen = signal(false);
  protected readonly isScrolled = signal(false);
  protected readonly isAuthenticated = signal(false);

  // Navigation items para usuarios no autenticados (landing page)
  protected readonly publicNavItems = signal<NavItem[]>([
    { label: 'Inicio', route: '/home', icon: 'home' },
    { label: 'Servicios', route: '/services', icon: 'build' },
    { label: 'Portafolio', route: '/portfolio', icon: 'work' },
    { label: 'Sobre Nosotros', route: '/about', icon: 'people' },
    { label: 'Contacto', route: '/contact', icon: 'mail' },
  ]);

  // Navigation items para usuarios autenticados (dashboard)
  protected readonly dashboardNavItems = signal<NavItem[]>([
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { label: 'Proyectos', route: '/dashboard/projects', icon: 'folder' },
    { label: 'Tareas', route: '/dashboard/tasks', icon: 'task' },
    { label: 'Reportes', route: '/dashboard/reports', icon: 'analytics' },
  ]);

  // User menu items
  protected readonly userMenuItems = signal<NavItem[]>([
    { label: 'Mi Perfil', route: '/dashboard/profile', icon: 'person' },
    { label: 'Configuración', route: '/dashboard/settings', icon: 'settings' },
  ]);

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled.set(window.scrollY > 50);
      });
    }

    // Detectar si el usuario está autenticado basado en la ruta
    this.router.events.subscribe(() => {
      const url = this.router.url;
      this.isAuthenticated.set(url.includes('/dashboard'));
    });
  }

  get currentNavItems() {
    return this.isAuthenticated() ? this.dashboardNavItems() : this.publicNavItems();
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

  logout() {
    // TODO: Implementar lógica de logout con auth service
    console.log('Cerrando sesión...');
    this.isAuthenticated.set(false);
    this.router.navigate(['/home']);
    this.closeMenu();
  }
}
