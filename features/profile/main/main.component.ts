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
  userName: string = '';
  userEmail: string = '';
  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userName = user.name;    // MockAPI guarda como "name"
      this.userEmail = user.email;
    }
  }
  
  goToEditProfile(): void {
    this.router.navigate(['/edit-profile']);
  }
}
