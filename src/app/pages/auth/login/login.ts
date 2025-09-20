import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { loginService } from '../../../services/login';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder , private loginService: loginService) {
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
      return null; // valid
    }
    return { invalidUsernameOrEmail: true };
  }

  // 🟢 Getter علشان أسهل النداء في الـ HTML
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
        // ممكن تحفظ التوكن في الـ localStorage أو تعمل redirect
      },
      error: (error) => {
        console.error('Login failed:', error);
        // ممكن تعرض رسالة خطأ للمستخدم
      }
    }); 
  }
}
