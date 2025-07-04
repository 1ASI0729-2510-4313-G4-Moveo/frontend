import { Component, OnInit } from '@angular/core';
import {HeaderBarProviderComponent} from "../../../project/components/header-bar-provider/header-bar-provider.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-provider-profile',
  templateUrl: './provider-profile.component.html',
  imports: [
    HeaderBarProviderComponent
  ],
  styleUrls: ['./provider-profile.component.css']
})
export class ProviderProfileComponent implements OnInit {
  providerName = '';
  providerEmail = '';
  stats = {
    carsListed: 4,
    totalEarnings: 423.10,
    lastRented: '06/10/2025',
    carsSold: 2,
    bookings: 17,
    avgRating: 4.6
  };

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.providerName = user.name || 'Provider';
    this.providerEmail = user.email || 'provider@email.com';
  }

  goToEditProfile() {
    this.router.navigate(['/provider/profile/edit']);
  }
}
