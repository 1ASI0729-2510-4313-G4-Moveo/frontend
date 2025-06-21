import { Component, OnInit } from '@angular/core';
import {HeaderBarProviderComponent} from "../../../project/components/header-bar-provider/header-bar-provider.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-provide-payment',
  imports: [
    HeaderBarProviderComponent,
  ],
  templateUrl: './provide-payment.component.html',
  styleUrl: './provide-payment.component.css'
})
export class ProvidePaymentComponent implements OnInit {
  cardNumber: string = '';
  holder: string = '';

  constructor(private router: Router) {
  }

  ngOnInit() {
    const paymentData = localStorage.getItem('paymentInfo');
    if (paymentData) {
      const parsedData = JSON.parse(paymentData);
      this.cardNumber = parsedData.cardNumber;
      this.holder = parsedData.holder;

    }
  }
  goToEditProvide() {
    this.router.navigate(['/provide/payment/edit']);
  }
}
