import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderBarComponent} from './public/components/header-bar/header-bar.component';
import {PaymentProvidersComponent} from './public/pages/payment-providers/payment-providers.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pruebaOpenSource';
}
