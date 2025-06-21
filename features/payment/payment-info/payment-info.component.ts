import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HeaderBarComponent} from "../../../project/components/header-bar/header-bar.component";

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  imports: [
    HeaderBarComponent
  ],
  styleUrls: ['./payment-info.component.css']
})
export class PaymentInfoComponent implements OnInit {
  cardNumber: string = '';
  holder: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const paymentData = localStorage.getItem('paymentInfo');
    if (paymentData) {
      const parsedData = JSON.parse(paymentData);
      this.cardNumber = parsedData.cardNumber;
      this.holder = parsedData.holder;
    }
  }

  goToEdit() {
    this.router.navigate(['/payment/edit']);
  }
}


