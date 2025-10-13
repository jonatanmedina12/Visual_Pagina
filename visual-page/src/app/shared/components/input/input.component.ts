import { Component, input, output, signal, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
export type InputSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-input',
  imports: [CommonModule, MatIconModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  // Inputs
  label = input<string>('');
  placeholder = input<string>('');
  type = input<InputType>('text');
  size = input<InputSize>('medium');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  error = input<string>('');
  success = input<boolean>(false);
  icon = input<string>('');
  iconPosition = input<'left' | 'right'>('right');
  maxLength = input<number>();
  minLength = input<number>();

  // Outputs
  valueChange = output<string>();
  blur = output<void>();
  focus = output<void>();
  iconClick = output<void>();

  // Internal state
  protected readonly isFocused = signal(false);
  protected readonly currentValue = signal('');
  protected readonly showPassword = signal(false);

  private onChange = (value: string) => {};
  private onTouched = () => {};

  get isPasswordType(): boolean {
    return this.type() === 'password';
  }

  get actualInputType(): string {
    if (this.isPasswordType) {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type();
  }

  get passwordToggleIcon(): string {
    return this.showPassword() ? 'visibility_off' : 'visibility';
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.currentValue.set(value);
    this.onChange(value);
    this.valueChange.emit(value);
  }

  onInputFocus() {
    this.isFocused.set(true);
    this.focus.emit();
  }

  onInputBlur() {
    this.isFocused.set(false);
    this.onTouched();
    this.blur.emit();
  }

  onIconClick() {
    if (this.isPasswordType) {
      this.togglePasswordVisibility();
    } else {
      this.iconClick.emit();
    }
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.currentValue.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // This will be handled by the disabled input signal
  }
}