import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-header-bar-provider',
  templateUrl: './header-bar-provider.component.html',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['./header-bar-provider.component.css']

})

export class HeaderBarProviderComponent {

}
