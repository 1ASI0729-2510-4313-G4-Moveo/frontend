import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderBarComponent} from './project/components/header-bar/header-bar.component';
import {PaymentProvidersComponent} from './project/pages/payment-providers/payment-providers.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderBarComponent, PaymentProvidersComponent,],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pruebaOpenSource';
}
