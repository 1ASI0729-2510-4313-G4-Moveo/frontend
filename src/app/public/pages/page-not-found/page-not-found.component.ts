import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  requestedRoute: string;

  constructor(private router: Router) {
    this.requestedRoute = this.router.url;
  }
  goHome() {
    this.router.navigate(['/']);
  }
}
