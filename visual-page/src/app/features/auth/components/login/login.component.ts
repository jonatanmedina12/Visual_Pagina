import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ScrollAnimationDirective } from '../../../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    ScrollAnimationDirective
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  protected readonly isLoading = signal(false);
  protected readonly isSuccess = signal(false);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  getEmailError(): string {
    const control = this.emailControl;
    if (!control?.touched) return '';

    if (control?.hasError('required')) {
      return 'El correo electrónico es requerido';
    }
    if (control?.hasError('email')) {
      return 'Ingresa un correo válido';
    }
    return '';
  }

  getPasswordError(): string {
    const control = this.passwordControl;
    if (!control?.touched) return '';

    if (control?.hasError('required')) {
      return 'La contraseña es requerida';
    }
    if (control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  }


  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.isSuccess.set(false);

      // Simulate authentication
      setTimeout(() => {
        console.log('Login successful:', this.loginForm.value);
        this.isLoading.set(false);
        this.isSuccess.set(true);

        // Navigate to dashboard after success
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }
}
