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
      RouterLink,
      NgOptimizedImage
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.authService.login().subscribe(users => {
      const user = users.find((u: any) =>
          u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('email', user.email);
        localStorage.setItem('type', user.type);
        localStorage.setItem('phone', user.phone);


        if (user.type === 'provider') {
          this.router.navigate(['/provider/profile']);
        } else {
          this.router.navigate(['/rent']);
        }

        this.loginError = false;
      } else {
        this.loginError = true;
      }
    });
  }
}

