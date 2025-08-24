import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, LoginRequest } from '../../services/auth.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatProgressSpinner,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: FormControl<string | null> = new FormControl<string>('', [
    Validators.required,
    Validators.email,
  ]);
  password: FormControl<string | null> = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  loginForm!: FormGroup;
  inlineNotification = {
    show: false,
    type: '',
    text: '',
  };
isLoading: any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: this.email,     
      password: this.password,
    });
  }
  login() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        email: this.email.value!,     
        password: this.password.value!,
      };
      this.authService.login(loginRequest).subscribe({
        next: (res: any) => {
          console.log('Login response:', res);
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          localStorage.setItem('username', res.username);
          localStorage.setItem('email', res.email);
          this.authService.setLoggedIn(true);
          this.router.navigate(['']); // go to home/dashboard
        },
        error: (err: any) => {
          console.error(err);
          this.loginForm.reset();
          this.inlineNotification = {
            show: true,
            type: 'error',
            text: 'Login failed, please try again!',
          };
        },
      });
    } else {
      this.inlineNotification = {
        show: true,
        type: 'error',
        text: 'Please fill up mandatory fields!',
      };
    }
  }
}
