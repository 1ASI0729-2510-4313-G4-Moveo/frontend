import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HeaderBarComponent } from '../../../project/components/header-bar/header-bar.component';

@Component({
  selector: 'app-record-detail',
  standalone: true,
  imports: [HeaderBarComponent],
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.css']
})
export class RecordDetailComponent implements OnInit {
  car: any;

  cars = [
    {
      id: 1,
      model: 'Toyota Corolla',
      plate: 'CZT–728',
      hours: 5,
      price: 15.30,
      pickup: 'Playa De Estacionamiento Alcanfores',
      image: 'assets/car1.png',
      date: '05/03/2025',
      startHour: '2:00pm',
      endHour: '7:00pm',
      distance: '21.7 km',
      rating: '4.85 Points',
      reservationId: 'MV–002154'
    },
    {
      id: 2,
      model: 'Kia Rio',
      plate: 'B7J–889',
      hours: 3,
      price: 10.50,
      pickup: 'Mall Aventura Santa Anita',
      image: 'assets/car2.png',
      date: '06/03/2025',
      startHour: '10:00am',
      endHour: '1:00pm',
      distance: '14.2 km',
      rating: '4.55 Points',
      reservationId: 'MV–002455'
    },
    {
      id: 3,
      model: 'Hyundai Accent',
      plate: 'C3M–210',
      hours: 1,
      price: 4.00,
      pickup: 'Rambla San Borja',
      image: 'assets/car3.png',
      date: '07/03/2025',
      startHour: '9:00am',
      endHour: '10:00am',
      distance: '8.1 km',
      rating: '4.70 Points',
      reservationId: 'MV–002728'
    },
    {
      id: 4,
      model: 'Chevrolet Spark',
      plate: 'E9X–547',
      hours: 4.5,
      price: 15.00,
      pickup: 'Plaza San Miguel',
      image: 'assets/car4.png',
      date: '08/03/2025',
      startHour: '3:30pm',
      endHour: '8:00pm',
      distance: '19.5 km',
      rating: '4.95 Points',
      reservationId: 'MV–003041'
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.car = this.cars.find(c => c.id === id);
    if (!this.car) this.router.navigate(['/record']);
  }

  archiveRecord(): void {
    this.router.navigate(['/record/confirmation', this.car.id]);
  }

  goBack(): void {
    this.location.back();
  }
}
