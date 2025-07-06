import { Component } from "@angular/core"
import { RouterLink, RouterLinkActive } from "@angular/router"
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component"

@Component({
  selector: "app-header-bar-provider",
  templateUrl: "./header-bar-provider.component.html",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SidebarComponent],
  styleUrls: ["./header-bar-provider.component.css"],
})
export class HeaderBarProviderComponent {
  sidebarOpen = false

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen
  }

  closeSidebar(): void {
    this.sidebarOpen = false
  }
}
