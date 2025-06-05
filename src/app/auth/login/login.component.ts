import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const {email, password} = this.loginForm.value;

    this.authService.login(email, password).subscribe(users => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.loginError = false;
        this.router.navigate(['/profile']);
      } else {
        this.loginError = true;
      }
    }, error => {
      console.error('API error:', error);
      this.loginError = true;
    });
  }
}

