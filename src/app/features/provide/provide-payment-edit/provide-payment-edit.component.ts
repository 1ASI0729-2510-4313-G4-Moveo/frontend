import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HeaderBarProviderComponent} from "../../../project/components/header-bar-provider/header-bar-provider.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-provide-payment-edit',
  imports: [
    HeaderBarProviderComponent,
      ReactiveFormsModule,
      NgIf
  ],
  templateUrl: './provide-payment-edit.component.html',
  styleUrl: './provide-payment-edit.component.css'
})
export class ProvidePaymentEditComponent {
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
      this.router.navigate(['/provide/payment']);
    }
  }

  connectPaypal() {
    window.open('https://www.paypal.com', '_blank');
  }
}
