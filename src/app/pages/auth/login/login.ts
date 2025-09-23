import { Component, OnInit } from '@angular/core';
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
export class Login implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private loginService: loginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required, this.usernameOrEmailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

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

    this.loginService.login(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
