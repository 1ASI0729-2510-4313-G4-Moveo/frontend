import { Component } from "@angular/core"
import { RouterLink, RouterLinkActive } from "@angular/router"
import { SidebarComponent } from "../../../shared/components/sidebar/sidebar.component"

@Component({
  selector: "app-header-bar",
  templateUrl: "./header-bar.component.html",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SidebarComponent],
  styleUrls: ["./header-bar.component.css"],
})
export class HeaderBarComponent {
  sidebarOpen = false

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen
  }

  closeSidebar(): void {
    this.sidebarOpen = false
  }
}
