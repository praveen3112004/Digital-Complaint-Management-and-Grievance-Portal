import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registerForm: FormGroup;
  isLoginMode = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['User', Validators.required],
      contact_info: ['']
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
    this.success = null;
    if (this.isLoginMode) {
      this.registerForm.get('name')?.disable();
      this.registerForm.get('role')?.disable();
      this.registerForm.get('contact_info')?.disable();
    } else {
      this.registerForm.get('name')?.enable();
      this.registerForm.get('role')?.enable();
      this.registerForm.get('contact_info')?.enable();
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    const val = this.registerForm.value;
    
    if (this.isLoginMode) {
      this.authService.login(val).subscribe({
        next: (res) => {
          this.router.navigate(['/complaints']);
        },
        error: (err) => this.error = err.error?.message || 'Login failed'
      });
    } else {
      this.authService.register(this.registerForm.getRawValue()).subscribe({
        next: (res) => {
          this.success = 'Registration successful! Please login.';
          this.toggleMode();
        },
        error: (err) => this.error = err.error?.message || 'Registration failed'
      });
    }
  }
}
