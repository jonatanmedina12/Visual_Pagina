import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ScrollAnimationDirective } from '../../../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    ScrollAnimationDirective
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  protected readonly isLoading = signal(false);
  protected readonly isSuccess = signal(false);

  registerForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  get firstNameControl() {
    return this.registerForm.get('firstName');
  }

  get lastNameControl() {
    return this.registerForm.get('lastName');
  }

  get emailControl() {
    return this.registerForm.get('email');
  }

  get passwordControl() {
    return this.registerForm.get('password');
  }

  get confirmPasswordControl() {
    return this.registerForm.get('confirmPassword');
  }

  passwordMatchValidator(control: AbstractControl): {[key: string]: any} | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }

  getFirstNameError(): string {
    const control = this.firstNameControl;
    if (!control?.touched) return '';

    if (control?.hasError('required')) {
      return 'El nombre es requerido';
    }
    if (control?.hasError('minlength')) {
      return 'El nombre debe tener al menos 2 caracteres';
    }
    return '';
  }

  getLastNameError(): string {
    const control = this.lastNameControl;
    if (!control?.touched) return '';

    if (control?.hasError('required')) {
      return 'El apellido es requerido';
    }
    if (control?.hasError('minlength')) {
      return 'El apellido debe tener al menos 2 caracteres';
    }
    return '';
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
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    return '';
  }

  getConfirmPasswordError(): string {
    const control = this.confirmPasswordControl;
    if (!control?.touched) return '';

    if (control?.hasError('required')) {
      return 'Debes confirmar tu contraseña';
    }
    if (this.registerForm?.hasError('passwordMismatch') && control?.touched) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }


  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.isSuccess.set(false);

      // Simulate registration
      setTimeout(() => {
        console.log('Registration successful:', this.registerForm.value);
        this.isLoading.set(false);
        this.isSuccess.set(true);

        // Navigate after success
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 1500);
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }
}
