import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { loginService } from '../../../services/login';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private loginService: loginService,
    private snackBar: MatSnackBar ,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required, this.usernameOrEmailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // ✅ Validator مخصص: يقبل يا إيميل صحيح أو يوزرنيم (أي نص بدون مسافات)
  usernameOrEmailValidator(control: any) {
    const value = control.value;
    if (!value) return null;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/;

    if (emailRegex.test(value) || usernameRegex.test(value)) {
      return null;
    }
    return { invalidUsernameOrEmail: true };
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    console.log('✅ Form Data:', this.loginForm.value);
    // هنا هتعمل API call للـ login
    this.loginService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // save token to local storage
        localStorage.setItem('token', response.token);
      
        // redirect to dashboard or home page
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.snackBar.open(error?.error?.message, '', {
          panelClass: ['snackbar-error'],
        });
      },
    });
  }
}
