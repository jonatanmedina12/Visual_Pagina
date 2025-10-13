import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ScrollAnimationDirective } from '../../../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    ScrollAnimationDirective
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  protected readonly isLoading = signal(false);
  protected readonly isSuccess = signal(false);

  forgotPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  get emailControl() {
    return this.forgotPasswordForm.get('email');
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

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading.set(true);
      this.isSuccess.set(false);

      // Simulate password reset email sending
      setTimeout(() => {
        console.log('Password reset email sent to:', this.forgotPasswordForm.value.email);
        this.isLoading.set(false);
        this.isSuccess.set(true);

        // Navigate back to login after success
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.forgotPasswordForm.controls).forEach(key => {
      const control = this.forgotPasswordForm.get(key);
      control?.markAsTouched();
    });
  }
}
