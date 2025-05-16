import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderBarComponent} from './project/components/header-bar/header-bar.component';
import {PaymentProvidersComponent} from './project/pages/payment-providers/payment-providers.component';
import {RecordListComponent} from "./project/pages/car-record/car-record.component";
import {CorollaPageComponent} from "./project/pages/corolla-page/corolla-page.component";
import {RecordArchivedComponent} from "./project/pages/record-archived/record-archived.component";
import {PaymentEditComponent} from "./project/pages/payment-edit/payment-edit.component";
import {PaymentViewComponent} from "./project/pages/payment-view/payment-view.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderBarComponent, PaymentProvidersComponent, RecordListComponent, CorollaPageComponent, RecordArchivedComponent, PaymentEditComponent, PaymentViewComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pruebaOpenSource';
}
