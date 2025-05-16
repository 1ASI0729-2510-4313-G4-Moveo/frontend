import { Component } from '@angular/core';
import {HeaderBarComponent} from "../../../project/components/header-bar/header-bar.component";
import {MatFormField, MatInput, MatSuffix} from "@angular/material/input";
import {MatDivider} from "@angular/material/divider";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-rent-main',
  imports: [
    HeaderBarComponent,
    MatFormField,
    MatInput,
    MatSuffix,
    MatDivider,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatFormField,
    MatIcon,
    MatCardActions,
    MatButton,
    FormsModule,
    NgForOf,
  ],
  templateUrl: './rent-main.component.html',
  styleUrl: './rent-main.component.css'
})
export class RentMainComponent {
  rentalHours: number = 1;

  cars = [
    { name: 'Toyota Corolla', price: 47, reviews: 184 },
    { name: 'Kia Rio', price: 45, reviews: 86 },
    { name: 'Hyundai Tucson', price: 44, reviews: 109 },
    { name: 'Mazda CX-5', price: 42, reviews: 53 },
    { name: 'Nissan Versa', price: 47, reviews: 72 }
  ];
}
