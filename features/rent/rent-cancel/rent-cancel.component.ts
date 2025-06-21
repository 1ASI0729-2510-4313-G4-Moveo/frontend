import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HeaderBarComponent} from "../../../project/components/header-bar/header-bar.component";
import { Location } from '@angular/common';
@Component({
  selector: 'app-rent-cancel',
  templateUrl: './rent-cancel.component.html',
  imports: [
    HeaderBarComponent
  ],
  styleUrls: ['./rent-cancel.component.css']
})
export class RentCancelComponent implements OnInit {
  carId: number = 0;
  hours: string = '';
  price: string = '';
  pickupLocation: string = '';
  carName: string = '';
  plate: string = '';

  cars = [
    { id: 1, name: 'Toyota Corolla', plate: 'CZT–728' },
    { id: 2, name: 'Kia Rio', plate: 'B7J–889' },
    { id: 3, name: 'Hyundai Tucson', plate: 'C3M–210' },
    { id: 4, name: 'Mazda CX–5', plate: 'XRQ–352' },
    { id: 5, name: 'Nissan Versa', plate: 'NV–901' }
  ];

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.carId = Number(this.route.snapshot.paramMap.get('id'));
    const selectedCar = this.cars.find(car => car.id === this.carId);

    this.hours = localStorage.getItem('hours') ?? '';
    this.price = localStorage.getItem('price') ?? '';
    this.pickupLocation = localStorage.getItem('pickupLocation') ?? '';

    if (selectedCar) {
      this.carName = selectedCar.name;
      this.plate = selectedCar.plate;
    }
  }
  goBack(): void {
    this.location.back();
  }
}
