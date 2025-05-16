import { Component } from '@angular/core';
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
export class PaymentInfoComponent {
  constructor(private router: Router) {}

  goToEdit() {
    this.router.navigate(['/payment/edit']);
  }
}

