import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HeaderBarProviderComponent} from "../../../project/components/header-bar-provider/header-bar-provider.component";

@Component({
  selector: 'app-provide-success',
  templateUrl: './provide-success.component.html',
  imports: [
    HeaderBarProviderComponent
  ],
  styleUrls: ['./provide-success.component.css']
})
export class ProvideSuccessComponent implements OnInit {
  latestCar: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const cars = JSON.parse(localStorage.getItem('cars') || '[]');
    this.latestCar = cars[cars.length - 1];
  }

  goBack(): void {
    this.router.navigate(['/provide']);
  }
}
