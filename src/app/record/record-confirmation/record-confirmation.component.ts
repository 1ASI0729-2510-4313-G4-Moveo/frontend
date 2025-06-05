import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {HeaderBarComponent} from "../../public/components/header-bar/header-bar.component";

@Component({
  selector: 'app-record-confirmation',
  templateUrl: './record-confirmation.component.html',
  styleUrls: ['./record-confirmation.component.css'],
  imports: [
    HeaderBarComponent
  ]
})
export class RecordConfirmationComponent {
  email: string = 'hola123@gmail.com';

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/record']);
  }
}
