import { Component, OnInit } from '@angular/core';
import {HeaderBarProviderComponent} from "../../../project/components/header-bar-provider/header-bar-provider.component";

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

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.providerName = user.name || 'Provider';
    this.providerEmail = user.email || 'provider@email.com';
  }

  goToEditProfile() {
    // Ajusta la ruta si tu edit está en otra carpeta
    window.location.href = 'provide/profile/edit';
  }
}
