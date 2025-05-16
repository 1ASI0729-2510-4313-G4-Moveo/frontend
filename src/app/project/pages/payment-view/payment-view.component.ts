import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-payment-view',
    templateUrl: './payment-view.component.html',
    styleUrls: ['./payment-view.component.css'],
    standalone: true
})
export class PaymentViewComponent {
    cardNumber = '**6249';
    cardType = 'VISA';
    cardHolder = 'Manolo Maracuya';

    constructor(private router: Router) {}

    onEdit() {
        this.router.navigate(['/payment-edit']);
    }
}
