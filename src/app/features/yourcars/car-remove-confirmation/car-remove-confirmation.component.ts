import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  HeaderBarProviderComponent
} from "../../../project/components/header-bar-provider/header-bar-provider.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-remove-confirmation',
  templateUrl: './car-remove-confirmation.component.html',
  imports: [
    HeaderBarProviderComponent, CommonModule
  ],
  styleUrls: ['./car-remove-confirmation.component.css']
})
export class CarRemoveConfirmationComponent implements OnInit {
  car: any;

  cars = [
    {
      id: 2,
      name: 'Kia Rio',
      plate: 'B7J-888',
      email: 'hola123@gmail.com',
      date: '05/03/2025',
      pickupPoint: 'Estacionamiento Mall Aventura Santa Anita',
      distance: '432.7 km',
      rating: '4.2 Points',
      reservationId: 'MV-002154',
      revenue: 'S/ 272.30',
      incidents: 0,
      image: '/assets/car2.png'
    },
    {
      id: 3,
      name: 'Hyundai Accent',
      plate: 'C3M-210',
      email: 'giancarlinho12345@gmail.com',
      date: '22/01/2025',
      pickupPoint: 'Estación Surco Jockey Plaza',
      revenue: 'S/ 178.60',
      incidents: 1,
      rating: '4.5 Points',
      reservationId: 'MV-002188',
      distance: '312.4 km',
      image: '/assets/car3.png'
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.car = this.cars.find(c => c.id === id);
  }
}
