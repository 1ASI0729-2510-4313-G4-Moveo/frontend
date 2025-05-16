import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register-step2',
  standalone: true,
  templateUrl: './register-step2.component.html',
  styleUrls: ['./register-step2.component.css'],
  imports: [ReactiveFormsModule, NgIf, RouterLink]
})
export class RegisterStep2Component {
  registerForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('repeatPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  get email() {
    return this.registerForm.get('email')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  get repeatPassword() {
    return this.registerForm.get('repeatPassword')!;
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('License file selected:', file.name);
    }
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      // Aquí podrías guardar el usuario...
      this.router.navigate(['/profile']).then(() => {
        console.log('Navigation completed');
      });
    }
  }
}