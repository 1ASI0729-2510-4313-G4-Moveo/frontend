import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    NgOptimizedImage
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const storedUser = localStorage.getItem('userProfile');
    if (!storedUser) {
      this.loginError = true;
      return;
    }

    const user = JSON.parse(storedUser);
    const enteredEmail = this.loginForm.value.email;
    const enteredPassword = this.loginForm.value.password;

    if (user.email === enteredEmail && user.password === enteredPassword) {
      this.loginError = false;
      this.router.navigate(['/profile']);
    } else {
      this.loginError = true;
    }
  }
}

