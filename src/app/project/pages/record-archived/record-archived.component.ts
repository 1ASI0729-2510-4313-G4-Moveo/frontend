import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-record-archived',
    templateUrl: './record-archived.component.html',
    styleUrls: ['./record-archived.component.css']
})
export class RecordArchivedComponent {
    @Input() email: string = 'hola123agmail.com';

    @Input() record = {
        date: '05/03/2025',
        startHour: '2:00pm',
        endHour: '7:00pm',
        distance: '21.7 km',
        rating: 4.85,
        price: 'S/ 15.30',
        pickupPoint: 'Playa De Estacionamiento Alcanfore',
        reservationId: 'MV–002154',
        car: {
            name: 'Toyota Corolla',
            plate: 'CZT-728',
            image: 'assets/images/corolla.png'
        }
    };

    constructor(private location: Location) {}

    goBack(): void {
        this.location.back();
    }
}
