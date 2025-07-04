import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  HeaderBarProviderComponent
} from "../../../project/components/header-bar-provider/header-bar-provider.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-your-car-detail',
  templateUrl: './your-car-detail.component.html',
  imports: [
    HeaderBarProviderComponent, CommonModule
  ],
  styleUrls: ['./your-car-detail.component.css']
})
export class YourCarDetailComponent implements OnInit {
  carId!: number;
  car: any;

  cars = [
    {
      id: 1,
      name: 'Toyota Corolla',
      plate: 'CZT-728',
      date: '05/03/2025',
      startHour: '2:00pm',
      endHour: '7:00pm',
      price: 'S/ 15.30',
      pickupPoint: 'Playa De Estacionamiento Alcanfore',
      renterName: 'Manolo Maracuya',
      rating: '4.85 Points',
      reservationId: 'MV-002154',
      distance: '21.7 km',
      status: 'in_use',
      image: '/assets/car1.png'
    },
    {
      id: 2,
      name: 'Kia Rio',
      plate: 'B7J-888',
      date: '10/02/2025',
      location: 'Estacionamiento Mall Aventura Santa Anita',
      revenue: 'S/ 272.30',
      incidents: 0,
      renterName: 'Fernando Flores',
      rating: '4.2 Points',
      reservationId: 'MV-002154',
      distance: '432.7 km',
      travels: 12,
      image: '/assets/car2.png'
    },
    {
      id: 3,
      name: 'Hyundai Accent',
      plate: 'C3M-210',
      date: '22/01/2025',
      location: 'Estación Surco Jockey Plaza',
      revenue: 'S/ 178.60',
      incidents: 1,
      renterName: 'Lucía Martínez',
      rating: '4.5 Points',
      reservationId: 'MV-002188',
      distance: '312.4 km',
      travels: 7,
      image: '/assets/car3.png'
    },
    {
      id: 4,
      name: 'Chevrolet Spark',
      plate: 'E9X-547',
      date: '08/03/2025',
      startHour: '9:00am',
      endHour: '4:30pm',
      price: 'S/ 19.90',
      pickupPoint: 'Parqueo Real Plaza Salaverry',
      renterName: 'Jorge Ramírez',
      rating: '4.9 Points',
      reservationId: 'MV-002300',
      distance: '35.2 km',
      status: 'in_use',
      image: '/assets/car4.png'
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.carId = Number(this.route.snapshot.paramMap.get('id'));
    this.car = this.cars.find(c => c.id === this.carId);
  }

  goBack() {
    this.router.navigate(['/provide/your-cars']);
  }

  editCar() {
    alert('Edit option clicked');
  }

  removeCar() {
    this.router.navigate(['../../remove', this.carId], { relativeTo: this.route });
  }
}
