import { Component } from '@angular/core';
import {HeaderBarComponent} from "../../../project/components/header-bar/header-bar.component";
import {NgForOf} from "@angular/common";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-rent',
  standalone: true,
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css'],
  imports: [
    HeaderBarComponent,
    NgForOf,
    FormsModule
  ]
})
export class RentComponent {
  selectedCar: any = null;
  hours: number = 0;

  cars = [
    {id: 1, model: 'Toyota Corolla', image: 'assets/car1.png', pricePerHour: 3.06, rating: 4.7, reviews: 134},
    {id: 2, model: 'Kia Rio', image: 'assets/car2.png', pricePerHour: 3.50, rating: 4.5, reviews: 65},
    {id: 3, model: 'Hyundai Tucson', image: 'assets/car5.png', pricePerHour: 4.00, rating: 4.8, reviews: 109},
    {id: 4, model: 'Mazda CX-5', image: 'assets/car6.png', pricePerHour: 3.80, rating: 4.2, reviews: 53},
    {id: 5, model: 'Nissan Versa', image: 'assets/car7.png', pricePerHour: 3.20, rating: 4.7, reviews: 72}
  ];

  constructor(private router: Router) {
  }

  selectCar(car: any) {
    this.selectedCar = car;
  }

  calculateRent() {
    if (!this.selectedCar || !this.hours || this.hours <= 0) {
      alert('Please select a car and enter valid hours');
      return;
    }

    localStorage.setItem('rentHours', this.hours.toString());

    this.router.navigate(['/rent/confirm', this.selectedCar.id]);
  }
}
