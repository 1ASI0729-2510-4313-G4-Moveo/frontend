import { Component } from '@angular/core';

@Component({
    selector: 'app-record-list',
    templateUrl: './car-record.component.html',
    styleUrls: ['./car-record.component.css']
})
export class RecordListComponent {
    records = [
        {
            model: "Toyota Corolla 2014",
            plate: "CZT–728",
            hours: 5,
            price: "$15.30",
            pickup: "Playa De Estacionamiento Alcanfores",
            imageUrl: "assets/images/corolla.png"
        },
        {
            model: "Kia Rio",
            plate: "B7J–889",
            hours: 3,
            price: "$10.50",
            pickup: "Estacionamiento Mall Aventura Santa Anita",
            imageUrl: "assets/images/kia.png"
        },
        {
            model: "Hyundai Accent",
            plate: "C3M–210",
            hours: 1,
            price: "$4.00",
            pickup: "Estacionamiento Rambla San Borja",
            imageUrl: "assets/images/accent.png"
        },
        {
            model: "Chevrolet Spark",
            plate: "E9X–547",
            hours: 4.5,
            price: "$15.00",
            pickup: "Estacionamiento Plaza San Miguel",
            imageUrl: "assets/images/spark.png"
        }
    ];
}
