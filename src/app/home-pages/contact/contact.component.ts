import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
    selector: 'app-contact',
    standalone: true,
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
    imports: [HeaderComponent]
})
export class ContactComponent {

}
