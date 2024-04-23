import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
    selector: 'app-pricing-section',
    standalone: true,
    templateUrl: './pricing-section.component.html',
    styleUrl: './pricing-section.component.scss',
    imports: [HeaderComponent]
})
export class PricingSectionComponent {

}
