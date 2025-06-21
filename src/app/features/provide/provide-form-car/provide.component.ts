import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HeaderBarProviderComponent} from "../../../project/components/header-bar-provider/header-bar-provider.component";
import {Router} from "@angular/router";
@Component({
  selector: 'app-provide',
  templateUrl: './provide.component.html',
  imports: [
    ReactiveFormsModule,
    HeaderBarProviderComponent,
  ],
  styleUrls: ['./provide.component.css']
})
export class ProvideComponent {
  provideForm: FormGroup;
 carImage: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.provideForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      licensePlate: ['', [Validators.required, Validators.pattern(/^([A-Z0-9]{3}-?[0-9]{3})$/)]],
      color: ['', Validators.required],
      seats: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      transmission: ['', Validators.required], // manual or automatic
      pickupPlace: ['', Validators.required]   // 2 opciones
    });
  }

  submitForm(): void {
    if (this.provideForm.valid) {
      const newCar = this.provideForm.value;

      const storedCars = localStorage.getItem('cars');
      const cars = storedCars ? JSON.parse(storedCars) : [];

      cars.push(newCar);
      localStorage.setItem('cars', JSON.stringify(cars));

      this.router.navigate(['/provide/success']);

      console.log('Car saved in localStorage', newCar);
    }
  }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.carImage = reader.result;
        console.log('Base64 image:', this.carImage); // Esto se puede guardar en el backend más adelante
      };
      reader.readAsDataURL(file);
    }
  }
}
