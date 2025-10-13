import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.sass'],
})
export class HeroComponent {
  // Inputs configurables
  title = input<string>('Bienvenido a VisualPage');
  subtitle = input<string>('Crea experiencias web increíbles con la tecnología más moderna');
  primaryButtonText = input<string>('Comenzar Ahora');
  secondaryButtonText = input<string>('Ver Demo');
  primaryButtonRoute = input<string>('/contact');
  secondaryButtonRoute = input<string>('/portfolio');
  showButtons = input<boolean>(true);
  backgroundGradient = input<string>('linear-gradient(135deg, #1a365d 0%, #0a1f3f 100%)');

  protected readonly isAnimated = signal(true);
  protected readonly isAuthenticating = signal(false);
  protected readonly isAuthSuccess = signal(false);

  handleLogin() {
    this.isAuthenticating.set(true);
    this.isAuthSuccess.set(false);

    // Simular autenticación (reemplazar con lógica real)
    setTimeout(() => {
      console.log('Autenticado exitosamente');
      this.isAuthenticating.set(false);
      this.isAuthSuccess.set(true);

      // Resetear el estado después de 2 segundos
      setTimeout(() => {
        this.isAuthSuccess.set(false);
      }, 2000);
    }, 2000);
  }
}
