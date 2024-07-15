import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../app/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule , RouterModule],
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  fauthService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);

  userFrm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.userFrm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmpassword')?.value
      ? null : {'mismatch': true};
  }

  async createUser() {
    this.isLoading = true;
    this.errorMessage = '';
    console.log('Submitting form...');
    if (this.userFrm.valid) {
      try {
        const res = await this.fauthService.createAccount(
          this.userFrm.value.email,
          this.userFrm.value.password,
          this.userFrm.value.firstname,
          this.userFrm.value.lastname
        );
        console.log(res);
        alert("Your account has been created");
        this.router.navigate(['/admin']);
      } catch (err: any) {
        console.error(err);
        this.errorMessage = err.message;
      } finally {
        this.isLoading = false;
      }
    } else {
      this.errorMessage = 'Please fill all required fields correctly';
      this.isLoading = false;
    }
  }

  async signInWithGoogle() {
    try {
      const res = await this.fauthService.signInWithGoogle();
      console.log(res);
      alert("You have successfully signed in with Google");
      this.router.navigate(['/']);
    } catch (err: any) {
      console.error(err);
      this.errorMessage = err.message;
    }
  }
}