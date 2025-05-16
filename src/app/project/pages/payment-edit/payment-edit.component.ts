import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-payment-edit',
    templateUrl: './payment-edit.component.html',
    styleUrls: ['./payment-edit.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class PaymentEditComponent {
    paymentForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router) {
        this.paymentForm = this.fb.group({
            cardNumber: ['', Validators.required],
            holder: ['', Validators.required],
            expiry: ['', Validators.required],
            cvv: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.paymentForm.valid) {
            alert('✅ Payment info updated!');
            console.log(this.paymentForm.value);
            this.router.navigate(['/']);
        } else {
            this.paymentForm.markAllAsTouched();
        }
    }
}
