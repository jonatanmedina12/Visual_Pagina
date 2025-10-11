import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../../../shared/directives/scroll-animation.directive';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Stat {
  number: string;
  label: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  comment: string;
  avatar: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, ScrollAnimationDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  protected readonly features = signal<Feature[]>([
    {
      icon: '🚀',
      title: 'Rendimiento Óptimo',
      description: 'Construido con Angular 20 para máxima velocidad y eficiencia',
    },
    {
      icon: '💡',
      title: 'Diseño Moderno',
      description: 'Interfaz limpia y responsiva que se adapta a todos los dispositivos',
    },
    {
      icon: '🔧',
      title: 'Fácil de Usar',
      description: 'Componentes intuitivos y documentación completa',
    },
    {
      icon: '🎨',
      title: 'Personalizable',
      description: 'Adapta el diseño a tus necesidades con SASS',
    },
  ]);

  protected readonly stats = signal<Stat[]>([
    { number: '500+', label: 'Proyectos Completados' },
    { number: '98%', label: 'Satisfacción del Cliente' },
    { number: '50+', label: 'Clientes Activos' },
    { number: '24/7', label: 'Soporte Técnico' },
  ]);

  protected readonly testimonials = signal<Testimonial[]>([
    {
      name: 'María González',
      role: 'CEO',
      company: 'TechCorp',
      comment: 'VisualPage transformó completamente nuestra presencia digital. El equipo es profesional y los resultados superaron nuestras expectativas.',
      avatar: '👩‍💼',
    },
    {
      name: 'Carlos Ramírez',
      role: 'Director de Marketing',
      company: 'Innovation Labs',
      comment: 'La calidad del trabajo y la atención al detalle son excepcionales. Definitivamente recomendaría sus servicios.',
      avatar: '👨‍💼',
    },
    {
      name: 'Ana Martínez',
      role: 'Fundadora',
      company: 'StartupXYZ',
      comment: 'Trabajar con VisualPage fue una experiencia increíble. Entendieron nuestra visión y la hicieron realidad.',
      avatar: '👩‍💻',
    },
  ]);
}
