import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { LoginVM } from '../../interfaces/login/login-vm';

@Component({
  selector: 'app-login',
  imports: [CommonModule, NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService)
  router = inject(Router)

  error: string | null = null;

  login = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })
  
  tryLogin() {
    const email = this.login.controls['email'].value;
    const password = this.login.controls['password'].value;
  
    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = "Could not find an account with the given credentials. Please try again."
      }
    });
  }
}
