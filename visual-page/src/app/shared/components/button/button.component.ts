import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent {
  // Inputs
  label = input<string>('Button');
  type = input<'button' | 'submit' | 'reset'>('button');
  variant = input<'primary' | 'secondary' | 'success' | 'danger' | 'outline'>('primary');
  size = input<'small' | 'medium' | 'large'>('medium');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  success = input<boolean>(false); // Estado de éxito
  icon = input<string>(''); // Clase del ícono (ej: 'fas fa-user')
  iconPosition = input<'left' | 'right'>('left');

  // Output
  buttonClick = output<void>();

  onClick() {
    if (!this.disabled() && !this.loading()) {
      this.buttonClick.emit();
    }
  }
}
