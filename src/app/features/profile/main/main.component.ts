import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {HeaderBarComponent} from "../../../project/components/header-bar/header-bar.component";
import {OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  imports: [
    RouterLink,
      HeaderBarComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  userData: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const data = localStorage.getItem('userProfile');
    if (data) {
      this.userData = JSON.parse(data);
    }
  }

  goToEditProfile(): void {
    this.router.navigate(['/edit-profile']);
  }
}
