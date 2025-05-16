import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register-step3',
  standalone: true,
  templateUrl: './register-step3.component.html',
  styleUrls: ['./register-step3.component.css'],
  imports: [ReactiveFormsModule, NgIf, RouterLink]
})
export class RegisterStep3Component {
  securityForm: FormGroup;
  insuranceFile: File | null = null;
  cardFile: File | null = null;
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('repeatPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }
  constructor(private fb: FormBuilder, private router: Router) {
    this.securityForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  get fullName() {
    return this.securityForm.get('fullName')!;
  }
  get id() {
    return this.securityForm.get('id')!;
  }
  get phone() {
    return this.securityForm.get('phone')!;
  }

  onInsuranceSelected(event: any): void {
    const file = event.target.files[0];
    if (file) this.insuranceFile = file;
  }

  onCardSelected(event: any): void {
    const file = event.target.files[0];
    if (file) this.cardFile = file;
  }

  onSubmit(): void {
    if (this.securityForm.valid) {
      console.log('Form submitted:', this.securityForm.value);
      console.log('Insurance file:', this.insuranceFile?.name);
      console.log('Card file:', this.cardFile?.name);

      const userData = {
        fullName: this.securityForm.value.fullName,
        phone: this.securityForm.value.phone,
        id: this.securityForm.value.id,
        email: this.securityForm.value.email,
        password: this.securityForm.value.password
      };

      localStorage.setItem('userProfile', JSON.stringify(userData));

      this.router.navigate(['/profile']);
    }
  }
}

