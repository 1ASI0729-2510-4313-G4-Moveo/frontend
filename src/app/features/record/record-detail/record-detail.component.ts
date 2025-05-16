import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import {HeaderBarComponent} from "../../../project/components/header-bar/header-bar.component";

@Component({
  selector: 'app-record-detail',
  standalone: true,
  imports: [CommonModule, HeaderBarComponent, HeaderBarComponent],
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.css']
})
export class RecordDetailComponent {
  car: any;

  constructor(private router: Router, private location: Location) {
    const nav = this.router.getCurrentNavigation();
    this.car = nav?.extras.state?.['car'];

  }
  archiveRecord(): void {
    this.router.navigate(['/record/confirmation']);
  }
  goBack(): void {
    this.location.back();
  }
}
