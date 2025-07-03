import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {HeaderBarProviderComponent} from "../../project/components/header-bar-provider/header-bar-provider.component";
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-your-cars',
  imports: [
    HeaderBarProviderComponent, CommonModule,
  ],
  templateUrl: './your-cars.component.html',
  styleUrl: './your-cars.component.css'
})
export class YourCarsComponent {
  cars = [
    {
      id: 1,
      name: 'Toyota Corolla',
      model: 'Model S',
      plate: 'CZT–728',
      status: 'in_use',
      travels: 0,
      image: '/assets/car1.png'
    },
    {
      id: 2,
      name: 'Kia Rio',
      model: 'A4',
      plate: 'B7J–889',
      status: 'available',
      travels: 12,
      image: '/assets/car2.png'
    },
    {
      id: 3,
      name: 'Hyundai Accent',
      model: 'Prius',
      plate: 'C3M–210',
      status: 'available',
      travels: 7,
      image: '/assets/car3.png'
    },
    {
      id: 4,
      model: 'A',
      name: 'Chevrolet Spark',
      plate: 'E9X–547',
      status: 'available',
      travels: 21,
      image: '/assets/car4.png'
    }
  ];

  constructor(private router: Router) {}

  viewDetails(id: number) {
    this.router.navigate(['/your-cars/details', id]);
  }
}
