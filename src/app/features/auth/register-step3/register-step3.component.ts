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

  constructor(private fb: FormBuilder, private router: Router) {
    this.securityForm = this.fb.group({
      fullName: ['', Validators.required],
      id: ['', Validators.required],
      phone: ['', Validators.required]
    });
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
      this.router.navigate(['/profile']);
    }
  }
}

