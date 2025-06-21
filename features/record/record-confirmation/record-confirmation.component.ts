import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderBarComponent } from '../../../project/components/header-bar/header-bar.component';

@Component({
  selector: 'app-record-confirmation',
  templateUrl: './record-confirmation.component.html',
  styleUrls: ['./record-confirmation.component.css'],
  imports: [HeaderBarComponent]
})
export class RecordConfirmationComponent implements OnInit {
  email: string = 'hola123@gmail.com';
  car: any;

  cars = [
    {
      id: 1,
      model: 'Toyota Corolla',
      plate: 'CZT–728',
      date: '05/03/2025',
      startHour: '2:00pm',
      endHour: '7:00pm',
      distance: '21.7 km',
      rating: '4.85 Points',
      price: 15.30,
      pickup: 'Playa De Estacionamiento Alcanfores',
      reservationId: 'MV–002154',
      image: 'assets/car1.png'
    },
    {
      id: 2,
      model: 'Kia Rio',
      plate: 'B7J–889',
      date: '06/03/2025',
      startHour: '10:00am',
      endHour: '1:00pm',
      distance: '14.2 km',
      rating: '4.55 Points',
      price: 10.50,
      pickup: 'Mall Aventura Santa Anita',
      reservationId: 'MV–002455',
      image: 'assets/car2.png'
    },
    {
      id: 3,
      model: 'Hyundai Accent',
      plate: 'C3M–210',
      date: '07/03/2025',
      startHour: '9:00am',
      endHour: '10:00am',
      distance: '8.1 km',
      rating: '4.70 Points',
      price: 4.00,
      pickup: 'Rambla San Borja',
      reservationId: 'MV–002728',
      image: 'assets/car3.png'
    },
    {
      id: 4,
      model: 'Chevrolet Spark',
      plate: 'E9X–547',
      date: '08/03/2025',
      startHour: '3:30pm',
      endHour: '8:00pm',
      distance: '19.5 km',
      rating: '4.95 Points',
      price: 15.00,
      pickup: 'Plaza San Miguel',
      reservationId: 'MV–003041',
      image: 'assets/car4.png'
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.car = this.cars.find(c => c.id === id);
    if (!this.car) this.router.navigate(['/record']);
  }

  goBack(): void {
    this.router.navigate(['/record']);
  }
}
