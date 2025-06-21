import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HeaderBarComponent} from "../../../project/components/header-bar/header-bar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rent-confirm',
  standalone: true,
  templateUrl: './rent-confirm.component.html',
  styleUrls: ['./rent-confirm.component.css'],
  imports: [
    HeaderBarComponent,
    CommonModule
  ]
})
export class RentConfirmComponent implements OnInit {
  data: any = null;
  selectedPlace: string | null = null;

  cars = [
    { id: 1, model: 'Toyota Corolla', image: 'assets/car1.png', pricePerHour: 3.06 },
    { id: 2, model: 'Kia Rio', image: 'assets/car2.png', pricePerHour: 3.50 },
    { id: 3, model: 'Hyundai Tucson', image: 'assets/car5.png', pricePerHour: 4.00 },
    { id: 4, model: 'Mazda CX-5', image: 'assets/car6.png', pricePerHour: 3.80 },
    { id: 5, model: 'Nissan Versa', image: 'assets/car7.png', pricePerHour: 3.20 }
  ];

  constructor(private route: ActivatedRoute, protected router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const hours = Number(localStorage.getItem('rentHours'));

    const car = this.cars.find(c => c.id === id);
    if (!car || !hours) {
      this.router.navigate(['/rent']);
      return;
    }

    this.data = {
      id: car.id,
      model: car.model,
      image: car.image,
      hours: hours,
      total: (car.pricePerHour * hours).toFixed(2)
    };
  }
  togglePickup(place: string): void {
    if (this.selectedPlace === place) {
      this.selectedPlace = null;
      localStorage.removeItem('pickupLocation');
    } else {
      this.selectedPlace = place;
      localStorage.setItem('pickupLocation', place);
    }
  }

  isSelected(place: string): boolean {
    return this.selectedPlace === place;
  }

  confirmRent(): void {
    if (this.selectedPlace && this.data?.id) {
      this.router.navigate(['/rent/final-confirm', this.data.id]);
    }
  }
}
