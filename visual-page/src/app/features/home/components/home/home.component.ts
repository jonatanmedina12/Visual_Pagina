import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
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
}
