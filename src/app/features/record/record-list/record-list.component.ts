import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderBarComponent} from "../../../project/components/header-bar/header-bar.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-record-list',
  standalone: true,
  imports: [CommonModule, HeaderBarComponent, HeaderBarComponent],
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent {
  cars = [
    {
      model: 'Toyota Corolla',
      plate: 'CZT–728',
      hours: 5,
      price: 15.30,
      pickup: 'Playa De Estacionamiento Alcanfores',
      image: 'assets/car1.png'
    },
    {
      model: 'Kia Rio',
      plate: 'B7J–889',
      hours: 3,
      price: 10.50,
      pickup: 'Mall Aventura Santa Anita',
      image: 'assets/car2.png'
    },
    {
      model: 'Hyundai Accent',
      plate: 'C3M–210',
      hours: 1,
      price: 4.00,
      pickup: 'Rambla San Borja',
      image: 'assets/car3.png'
    },
    {
      model: 'Chevrolet Spark',
      plate: 'E9X–547',
      hours: 4.5,
      price: 15.00,
      pickup: 'Plaza San Miguel',
      image: 'assets/car4.png'
    }
  ];

  constructor(private router: Router) {}
  viewDetail(car: any): void {
    this.router.navigate(['/record/detail'], {state: {car}});
  }
}
