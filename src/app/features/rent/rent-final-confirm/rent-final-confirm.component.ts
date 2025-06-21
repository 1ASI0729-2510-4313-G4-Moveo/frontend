import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HeaderBarComponent} from "../../../project/components/header-bar/header-bar.component";
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rent-final-confirm',
  templateUrl: './rent-final-confirm.component.html',
  imports: [
    HeaderBarComponent,
      CommonModule
  ],
  styleUrls: ['./rent-final-confirm.component.css']
})
export class RentFinalConfirmComponent implements OnInit {
  data: any = null;

  cars = [
    { id: 1, model: 'Toyota Corolla', image: 'assets/car1.png', pricePerHour: 3.06, plate: 'CZT–728' },
    { id: 2, model: 'Kia Rio', image: 'assets/car2.png', pricePerHour: 3.50, plate: 'B7J–889' },
    { id: 3, model: 'Hyundai Tucson', image: 'assets/car5.png', pricePerHour: 4.00, plate: 'C3M–210' },
    { id: 4, model: 'Mazda CX-5', image: 'assets/car6.png', pricePerHour: 3.80, plate: 'E9X–547' },
    { id: 5, model: 'Nissan Versa', image: 'assets/car7.png', pricePerHour: 3.20, plate: 'NV–901' }
  ];

  constructor(private route: ActivatedRoute, protected router: Router, private location: Location) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const hours = Number(localStorage.getItem('rentHours'));
    const pickup = localStorage.getItem('pickupLocation') ?? '-';
    const car = this.cars.find(c => c.id === id);

    if (!car || !hours) {
      this.router.navigate(['/rent']);
      return;
    }

    this.data = {
      id: id,
      model: car.model,
      plate: car.plate,
      image: car.image,
      hours: hours,
      price: (car.pricePerHour * hours).toFixed(2),
      location: pickup
    };
  }

  cancel(): void {
    localStorage.setItem('hours', this.data.hours.toString());
    localStorage.setItem('price', this.data.price.toString());
    localStorage.setItem('pickupLocation', this.data.location);
    this.router.navigate(['/rent/cancel', this.data.id]);
  }
  goBack(): void {
    this.location.back();
  }
}

