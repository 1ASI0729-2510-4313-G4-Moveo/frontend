import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-payment-providers',
  templateUrl: './payment-providers.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./payment-providers.component.css']
})
export class PaymentProvidersComponent implements OnInit {
  carForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.carForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      licensePlate: ['', Validators.required],
      color: ['', Validators.required],
      numberOfSeats: ['', [Validators.required, Validators.min(1)]],
      transmission: ['', Validators.required],
      pickupPlace: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.carForm.valid) {
      console.log('Form data:', this.carForm.value);
      alert('Car data submitted successfully!');
      this.carForm.reset();
    }
  }
}
