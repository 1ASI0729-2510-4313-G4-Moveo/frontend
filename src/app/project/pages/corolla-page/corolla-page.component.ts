import { Component } from '@angular/core';

@Component({
    selector: 'app-corolla-page',
    templateUrl: './corolla-page.component.html',
    styleUrls: ['./corolla-page.component.css']
})
export class CorollaPageComponent {
    archiveRecord() {
        console.log('Record archived');
    }
}
