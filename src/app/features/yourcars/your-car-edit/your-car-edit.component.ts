import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {
  HeaderBarProviderComponent
} from "../../../project/components/header-bar-provider/header-bar-provider.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-your-car-edit',
  templateUrl: './your-car-edit.component.html',
  imports: [
    ReactiveFormsModule,
    HeaderBarProviderComponent,
      CommonModule
  ],
  styleUrls: ['./your-car-edit.component.css']
})
export class YourCarEditComponent implements OnInit {
  carForm!: FormGroup;
  carId!: number;
  car: any;

  cars = [
    {
      id: 2,
      name: 'Kia Rio',
      brand: 'Kia',
      model: 'Rio',
      year: 2016,
      plate: 'B7J-888',
      color: 'Red',
      transmission: 'Automatic',
      seats: 4,
    },
    {
      id: 3,
      name: 'Hyundai Accent',
      brand: 'Hyundai',
      model: 'Accent',
      year: 2017,
      plate: 'C3M-210',
      color: 'Black',
      transmission: 'Manual',
      seats: 5,
    },
  ];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.carId = Number(this.route.snapshot.paramMap.get('id'));
    this.car = this.cars.find(c => c.id === this.carId);

    this.carForm = this.fb.group({
      brand: [{ value: this.car.brand, disabled: true }],
      model: [{ value: this.car.model, disabled: true }],
      year: [{ value: this.car.year, disabled: true }],
      plate: [{ value: this.car.plate, disabled: true }],
      color: [{ value: this.car.color, disabled: true }],
      transmission: [{ value: this.car.transmission, disabled: true }],
      seats: [{ value: this.car.seats, disabled: true }]
    });
  }

  takePhoto() {
    alert('Opening camera or file picker...');
  }
}
