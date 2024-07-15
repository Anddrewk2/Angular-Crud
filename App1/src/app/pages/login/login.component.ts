import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../app/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);

  loginForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        const result = await this.authService.login(
          this.loginForm.value.email,
          this.loginForm.value.password
        );
        console.log('Login successful', result);
        this.router.navigate(['/admin']); // Navigate to dashboard or home page
      } catch (error: any) {
        console.error('Login error', error);
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    } else {
      this.errorMessage = 'Please enter valid email and password.';
    }
  }

  async loginWithGoogle() {
    try {
      const result = await this.authService.signInWithGoogle();
      console.log('Google login successful', result);
      this.router.navigate(['/admin/main']); // Navigate to dashboard or home page
    } catch (error: any) {
      console.error('Google login error', error);
      this.errorMessage = error.message;
    }
  }
}