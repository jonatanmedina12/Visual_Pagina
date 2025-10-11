import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

interface FooterLink {
  title: string;
  url: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass'],
})
export class FooterComponent {
  protected readonly currentYear = signal(new Date().getFullYear());

  protected readonly socialLinks = signal<SocialLink[]>([
    { name: 'Facebook', icon: 'facebook', url: '#' },
    { name: 'Twitter', icon: 'close', url: '#' },
    { name: 'Instagram', icon: 'photo_camera', url: '#' },
    { name: 'LinkedIn', icon: 'business', url: '#' },
    { name: 'GitHub', icon: 'code', url: '#' },
  ]);

  protected readonly footerSections = signal<FooterSection[]>([
    {
      title: 'Empresa',
      links: [
        { title: 'Sobre Nosotros', url: '/about' },
        { title: 'Nuestro Equipo', url: '/team' },
        { title: 'Carreras', url: '/careers' },
        { title: 'Blog', url: '/blog' },
      ],
    },
    {
      title: 'Servicios',
      links: [
        { title: 'Desarrollo Web', url: '/services/web' },
        { title: 'Aplicaciones Móviles', url: '/services/mobile' },
        { title: 'Diseño UI/UX', url: '/services/design' },
        { title: 'Consultoría', url: '/services/consulting' },
      ],
    },
    {
      title: 'Soporte',
      links: [
        { title: 'Centro de Ayuda', url: '/help' },
        { title: 'Documentación', url: '/docs' },
        { title: 'FAQ', url: '/faq' },
        { title: 'Contacto', url: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { title: 'Privacidad', url: '/privacy' },
        { title: 'Términos de Uso', url: '/terms' },
        { title: 'Cookies', url: '/cookies' },
        { title: 'Licencias', url: '/licenses' },
      ],
    },
  ]);
}
