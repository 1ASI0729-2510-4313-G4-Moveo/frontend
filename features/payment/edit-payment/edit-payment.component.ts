import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {HeaderBarComponent} from "../../../project/components/header-bar/header-bar.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.css'],
  standalone: true,
  imports: [
    HeaderBarComponent,
    ReactiveFormsModule,
    NgIf
  ]
})
export class EditPaymentComponent {
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16)]],
      holder: ['', Validators.required],
      expiration: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const paymentData = this.paymentForm.value;
      localStorage.setItem('paymentInfo', JSON.stringify(paymentData));
      this.router.navigate(['/payment']);
    }
  }

  connectPaypal() {
    window.open('https://www.paypal.com', '_blank');
  }
}
